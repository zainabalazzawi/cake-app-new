import { z } from 'zod'

export const checkoutFormSchema = z.object({
  customerName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      /^[\d\s\-\+\(\)]+$/,
      'Please enter a valid phone number'
    )
    .min(10, 'Phone number must be at least 10 digits'),
  address: z
    .string()
    .min(1, 'Address is required')
    .max(200, 'Address must be less than 200 characters'),
  city: z
    .string()
    .min(1, 'City is required')
    .max(100, 'City must be less than 100 characters'),
  state: z
    .string()
    .min(1, 'State is required')
    .max(100, 'State must be less than 100 characters'),
  zipCode: z
    .string()
    .min(1, 'ZIP code is required')
    .regex(
      /^\d{5}(-\d{4})?$/,
      'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)'
    ),
})

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>
