'use client'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { AddOnCheckboxItem } from './AddOnCheckboxItem'

interface AddOnCheckboxesProps {
  candle: boolean
  birthdayCard: boolean
  personalizedMessage: string
  onCandleChange: (checked: boolean) => void
  onBirthdayCardChange: (checked: boolean) => void
  onMessageChange: (message: string) => void
}

const CANDLE_PRICE = 2
const BIRTHDAY_CARD_PRICE = 5

export const AddOnCheckboxes = ({
  candle,
  birthdayCard,
  personalizedMessage,
  onCandleChange,
  onBirthdayCardChange,
  onMessageChange,
}: AddOnCheckboxesProps) => {
  const totalAddOnPrice = (candle ? CANDLE_PRICE : 0) + (birthdayCard ? BIRTHDAY_CARD_PRICE : 0)

  return (
    <Card className="border-amber-200 bg-amber-50/30">
      <CardHeader>
        <CardTitle className="text-amber-900">Customize Your Order</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Candle */}
        <AddOnCheckboxItem
          id="candle"
          checked={candle}
          onCheckedChange={onCandleChange}
          label="Add Birthday Candle"
          price={CANDLE_PRICE}
        />

        {/* Birthday Card */}
        <AddOnCheckboxItem
          id="birthday-card"
          checked={birthdayCard}
          onCheckedChange={onBirthdayCardChange}
          label="Add Birthday Card"
          price={BIRTHDAY_CARD_PRICE}
        />

        {/* Personalized Message */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium text-amber-900">
            Personalized Message (Free)
          </Label>
          <Textarea
            id="message"
            placeholder="Enter your custom message for the cake..."
            value={personalizedMessage}
            onChange={(e) => onMessageChange(e.target.value)}
            className="min-h-[80px] resize-none border-amber-300 focus:border-amber-500"
            maxLength={200}
          />
          <p className="text-xs text-gray-500">
            {personalizedMessage.length}/200 characters
          </p>
        </div>
      </CardContent>

      {/* Total Add-ons Price */}
      {totalAddOnPrice > 0 && (
        <CardFooter className="border-t border-amber-200">
          <div className="flex justify-between items-center w-full">
            <span className="text-sm font-medium text-amber-900">Add-ons Total:</span>
            <span className="text-lg font-bold text-amber-900">
              {formatPrice(totalAddOnPrice)}
            </span>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

