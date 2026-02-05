'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Truck, ArrowRight, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { formatPrice } from '@/lib/utils'
import { useCart, useCreateOrder } from '@/hooks/useCart'
import { checkoutFormSchema, type CheckoutFormValues } from '@/lib/validations/checkout'

const ShippingPage = () => {
  const router = useRouter()
  const { data: cart } = useCart()
  const createOrder = useCreateOrder()

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      customerName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
  })

  // Calculate totals
  const cartItems = cart?.items || []
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      // Transform cart items to order items
      const orderItems = cartItems.map((item) => ({
        productId: item.productId,
        productName: item.product?.name || 'Unknown Product',
        quantity: item.quantity,
        includeCandle: item.includeCandle,
        includeBirthdayCard: item.includeBirthdayCard,
        personalizedMessage: item.personalizedMessage,
        price: item.price,
      }))

      // Create order with pending payment status
      const order = await createOrder.mutateAsync({
        ...data,
        items: orderItems,
        total,
        paymentStatus: 'pending',
      })

      // Navigate to payment page with order ID
      router.push(`/checkout/payment?orderId=${order.id}`)
    } catch (error) {
      console.error('Error creating order:', error)
      toast.error('Failed to place order', {
        description: 'Please try again or contact support.',
      })
    }
  }

  return (
    <div className="bg-linear-to-b from-amber-50 via-white to-orange-50 py-12 mx-auto px-5">
      <Link
        href="/checkout"
        className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-8 font-medium"
      >
        <ArrowLeft size={20} />
        Back to Cart
      </Link>

      <Card className="max-w-2xl border-amber-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-amber-900 flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Shipping Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St, Apt 4B" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid sm:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="New York" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="NY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input placeholder="10001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || createOrder.isPending}
                variant="primary-gradient"
                size="lg"
                className="w-full mt-4"
              >
                {(form.formState.isSubmitting || createOrder.isPending) ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Order...
                  </>
                ) : (
                  <>
                    Continue to Payment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ShippingPage
