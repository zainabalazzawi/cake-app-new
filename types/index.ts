export interface Product {
  id: string
  name: string
  category: 'celebration' | 'mini'
  price: number
  description: string
  imageUrl: string
  slug: string
}

export interface AddOn {
  candle: boolean
  birthdayCard: boolean
  personalizedMessage: string
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  includeCandle: boolean
  includeBirthdayCard: boolean
  personalizedMessage?: string
  price: number
}

export interface Order {
  id: string
  customerName: string
  email: string
  phone: string
  address: string
  city: string
  state?: string
  zipCode: string
  total: number
  items: OrderItem[]
  createdAt: Date
}

export interface LoginFormData {
  email: string
  password: string
}

export interface CheckoutFormData {
  customerName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  deliveryDate?: Date
}

export interface CartItem {
  id: string
  cartId: string
  productId: string
  quantity: number
  includeCandle: boolean
  includeBirthdayCard: boolean
  personalizedMessage?: string
  price: number
  createdAt: Date
  updatedAt: Date
  product?: Product
}

export interface Cart {
  id: string
  userId?: string
  sessionId?: string
  createdAt: Date
  updatedAt: Date
  items: CartItem[]
}

export interface CartItemUpdateData {
  quantity?: number
  includeCandle?: boolean
  includeBirthdayCard?: boolean
  personalizedMessage?: string | null
}

export interface AddToCartData {
  productId: string
  quantity: number
  includeCandle: boolean
  includeBirthdayCard: boolean
  personalizedMessage?: string
}

export interface CreateOrderData {
  customerName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  items: Omit<OrderItem, 'id' | 'orderId'>[]
  total: number
}
