'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { formatPrice } from '@/lib/utils'

interface AddOnCheckboxItemProps {
  id: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label: string
  price: number
}

export const AddOnCheckboxItem = ({ id, checked, onCheckedChange, label, price }: AddOnCheckboxItemProps) => {
  return (
    <div className="flex items-center space-x-3">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="border-amber-400 data-[state=checked]:bg-amber-900 data-[state=checked]:border-amber-900"
      />
      <Label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
      >
        <span>{label}</span>
        <span className="text-amber-700 font-semibold">
          {formatPrice(price)}
        </span>
      </Label>
    </div>
  )
}

