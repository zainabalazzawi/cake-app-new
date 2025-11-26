'use client'

import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface QuantityCounterProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export const QuantityCounter = ({ 
  value, 
  onChange, 
  min = 1, 
  max = 50 
}: QuantityCounterProps) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleDecrement}
        disabled={value <= min}
        className="h-10 w-10 rounded-full border-amber-300 text-amber-900 hover:bg-amber-50"
      >
        <Minus size={18} />
      </Button>
      <Input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        className="h-10 w-20 text-center text-lg font-semibold border-amber-300"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleIncrement}
        disabled={value >= max}
        className="h-10 w-10 rounded-full border-amber-300 text-amber-900 hover:bg-amber-50"
      >
        <Plus size={18} />
      </Button>
    </div>
  )
}

