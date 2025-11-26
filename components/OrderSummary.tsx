import { formatPrice } from '@/lib/utils'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface OrderSummaryProps {
  productName: string
  quantity: number
  productPrice: number
  addOnPrice: number
  itemTotal: number
}

export const OrderSummary = ({
  productName,
  quantity,
  productPrice,
  addOnPrice,
  itemTotal,
}: OrderSummaryProps) => {
  return (
    <Card className="border-2 border-amber-200 mb-6">
      <CardHeader>
        <CardTitle className="text-amber-900">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">{productName} x {quantity}</span>
          <span className="font-medium">{formatPrice(productPrice * quantity)}</span>
        </div>
        {addOnPrice > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Add-ons x {quantity}</span>
            <span className="font-medium">{formatPrice(addOnPrice * quantity)}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t border-amber-200 justify-between items-center">
        <span className="text-lg font-semibold text-amber-900">Total:</span>
        <span className="text-3xl font-bold text-amber-900">{formatPrice(itemTotal)}</span>
      </CardFooter>
    </Card>
  )
}

