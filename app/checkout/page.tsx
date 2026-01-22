'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { useCart, useDeleteCartItem } from '@/hooks/useCart'


const CheckoutPage = () => {


  // Fetch cart data from API
  const { data: cart, isLoading: cartLoading, error: cartError } = useCart()
  const deleteCartItem = useDeleteCartItem()
  
  // Transform cart items for display
  const cartItems = cart?.items?.map((item) => {
    const itemName = item.product?.name || 'Product'
    const addOns: string[] = []
    if (item.includeCandle) addOns.push('Candle')
    if (item.includeBirthdayCard) addOns.push('Birthday Card')
    const name = addOns.length > 0 ? `${itemName} (${addOns.join(', ')})` : itemName
    
    return {
      id: item.id,
      name,
      quantity: item.quantity,
      price: item.price,
    }
  }) || []
  
  const handleDeleteItem = async (itemId: string) => {
    try {
      await deleteCartItem.mutateAsync(itemId)
    } catch (error) {
      console.error('Failed to delete item:', error)
    }
  }
  
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  return (
    <div className="w-[40%]">
    <Card className="border-amber-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-amber-900">
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cart Items */}
        {cartLoading ? (
          <div className="text-center py-4 text-gray-600">Loading cart...</div>
        ) : cartError ? (
          <div className="text-center py-4 text-red-600">
            Error loading cart. Please try again.
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-4 text-gray-600">
            Your cart is empty
            <Link href="/" className="block mt-2 text-amber-700 hover:underline">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-start text-sm">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-gray-600">Qty: {item.quantity}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-amber-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteItem(item.id)}
                    disabled={deleteCartItem.isPending}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                    aria-label="Delete item"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-amber-200 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax (8%)</span>
            <span className="font-medium">{formatPrice(tax)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-green-600">FREE</span>
          </div>
        </div>

        <div className="border-t-2 border-amber-300 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-amber-900">Total</span>
            <span className="text-2xl font-bold text-amber-900">
              {formatPrice(total)}
            </span>
          </div>
        </div>

        <Link href="/checkout/shipping">
          <Button 
            variant="primary-gradient"
            disabled={cartItems.length === 0}
            size="lg"
            className="w-full mt-4"
          >
            Continue to Shipping
          </Button>
        </Link>

      </CardContent>
    </Card>
  </div>
  )
}

export default CheckoutPage;

