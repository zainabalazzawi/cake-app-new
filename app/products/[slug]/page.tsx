'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { ArrowLeft, ShoppingCart, Info, Cake, Check } from 'lucide-react'
import { toast } from 'sonner'
import QuantityCounter from '@/components/QuantityCounter'
import { OrderSummary } from '@/components/OrderSummary'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { formatPrice } from '@/lib/utils'
import { useProduct } from '@/hooks/useProducts'
import { useAddToCart } from '@/hooks/useCart'
import AddOnCheckboxes from '@/components/AddOnCheckboxes'

const CANDLE_PRICE = 2
const BIRTHDAY_CARD_PRICE = 5

const ProductDetailPage = () => {
  const params = useParams()
  const slug = params.slug as string
  
  const { data: product } = useProduct(slug)
  const addToCartMutation = useAddToCart()

  const [quantity, setQuantity] = useState(0)
  const [candle, setCandle] = useState(false)
  const [birthdayCard, setBirthdayCard] = useState(false)
  const [personalizedMessage, setPersonalizedMessage] = useState('')

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!product) {
    return (
      <div className="min-h-screen bg-linear-to-b from-amber-50 via-white to-orange-50">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-amber-900 mb-4">Product Not Found</h1>
          <Link href="/" className="text-amber-700 hover:underline inline-flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const addOnPrice = (candle ? CANDLE_PRICE : 0) + (birthdayCard ? BIRTHDAY_CARD_PRICE : 0)
  const itemTotal = (product.price + addOnPrice) * quantity

  const resetForm = () => {
    setQuantity(0)
    setCandle(false)
    setBirthdayCard(false)
    setPersonalizedMessage('')
  }

  const handleAddToCart = () => {
    if (!product || quantity === 0) return

    addToCartMutation.mutate({
      productId: product.id,
      quantity,
      includeCandle: candle,
      includeBirthdayCard: birthdayCard,
      personalizedMessage: personalizedMessage || undefined,
    }, {
      onSuccess: () => {
        // Show toast notification
        toast.success(`Added to cart!`, {
          description: `${quantity}x ${product.name} has been added to your cart.`,
        })
        
        // Reset form
        resetForm()
        
        // Reset mutation state after 2 seconds (to clear success animation)
        setTimeout(() => addToCartMutation.reset(), 2000)
      },
      onError: () => {
        toast.error('Failed to add to cart', {
          description: 'Please try again or contact support.',
        })
      }
    })
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 via-white to-orange-50">
      <main className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-8 font-medium">
          <ArrowLeft size={20} />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative aspect-4/3 rounded-2xl shadow-md">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
            <Badge className="absolute top-6 right-6 gap-2 bg-amber-900 px-4 py-2 text-sm font-medium text-white shadow-md">
              <Cake size={16} />
              {product.category === 'celebration' ? 'Celebration' : 'Mini'}
            </Badge>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-amber-900 mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-bold text-amber-900">
                {formatPrice(product.price)}
              </span>
              <span className="text-lg text-amber-700">per cake</span>
            </div>

            <p className="text-lg text-gray-700 mb-8">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="mb-8">
              <Label className="text-amber-900 mb-3">
                Quantity
              </Label>
              <QuantityCounter
                value={quantity}
                onChange={setQuantity}
                min={0}
                max={50}
              />
            </div>

            {/* Add-ons */}
            <div className="mb-8">
              <AddOnCheckboxes
                candle={candle}
                birthdayCard={birthdayCard}
                personalizedMessage={personalizedMessage}
                onCandleChange={setCandle}
                onBirthdayCardChange={setBirthdayCard}
                onMessageChange={setPersonalizedMessage}
                quantity={quantity}
              />
            </div>

            {/* Order Summary */}
            <OrderSummary
              productName={product.name}
              quantity={quantity}
              productPrice={product.price}
              addOnPrice={addOnPrice}
              itemTotal={itemTotal}
            />

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={addToCartMutation.isPending || quantity === 0}
              className={`w-full h-14 text-lg font-semibold transition-all duration-300 ${
                addToCartMutation.isSuccess 
                  ? 'bg-green-600 hover:bg-green-600 scale-[1.02]' 
                  : 'bg-amber-900 hover:bg-amber-800'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {addToCartMutation.isSuccess ? (
                <>
                  <Check className="mr-2 animate-bounce-in" size={20} />
                  Added to Cart!
                </>
              ) : addToCartMutation.isPending ? (
                <>
                  <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2" size={20} />
                  Add to Cart
                </>
              )}
            </Button>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200 flex gap-3">
              <Info size={20} className="text-amber-700 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                All cakes are made fresh to order. Please allow 24-48 hours for preparation and delivery.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductDetailPage

