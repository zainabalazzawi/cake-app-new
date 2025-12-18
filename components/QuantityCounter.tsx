'use client'

import { useState, useEffect } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface QuantityCounterProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

const QuantityCounter = ({ 
  value, 
  onChange, 
  min = 0, 
  max = 50 
}: QuantityCounterProps) => {
  const [inputValue, setInputValue] = useState(value.toString())

  // Sync inputValue when value prop changes
  useEffect(() => {
    setInputValue(value.toString())
  }, [value])

  const handleIncrement = () => {
    if (value < max) {
      const newValue = value + 1
      onChange(newValue)
      setInputValue(newValue.toString())
    }
  }

  const handleDecrement = () => {
    if (value > min) {
      const newValue = value - 1
      onChange(newValue)
      setInputValue(newValue.toString())
    }
  }

  const isValidValue = (numValue: number): boolean => {
    return !isNaN(numValue) && numValue >= min && numValue <= max
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    setInputValue(rawValue)
    
    const newValue = parseInt(rawValue)
    if (isValidValue(newValue)) {
      onChange(newValue)
    }
  }

  const handleBlur = () => {
    // Fix invalid input on blur
    const numValue = parseInt(inputValue)
    if (!isValidValue(numValue)) {
      setInputValue(value.toString())
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
        className="h-10 w-10 rounded-full border-amber-300 text-amber-900 hover:bg-amber-50 transition-colors"
      >
        <Minus size={18} />
      </Button>
      <Input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        min={min}
        max={max}
        className="h-10 w-20 text-center text-lg font-semibold border-amber-300 hide-spinner"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleIncrement}
        disabled={value >= max}
        className="h-10 w-10 rounded-full border-amber-300 text-amber-900 hover:bg-amber-50 transition-colors"
      >
        <Plus size={18} />
      </Button>
    </div>
  )
}

export default QuantityCounter
