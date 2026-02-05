import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import type { CartItem, AddToCartData, Cart, Order, CreateOrderData, PaymentData, PaymentResult } from '@/types'

export const useAddToCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: AddToCartData) => {
      const response = await axios.post<CartItem>('/api/cart/items', data)
      return response.data
    },
    onSuccess: () => {
      // Invalidate cart queries to refetch cart data
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await axios.get<Cart>('/api/cart')
      return response.data
    },
    retry: false,
  })
}

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (itemId: string) => {
      const response = await axios.delete(`/api/cart/items/${itemId}`)
      return response.data
    },
    onSuccess: () => {
      // Invalidate cart queries to refetch cart data
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateOrderData) => {
      const response = await axios.post<{ order: Order }>('/api/orders', data)
      return response.data.order
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}

export const usePayment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: PaymentData) => {
      const response = await axios.post<PaymentResult>('/api/payment', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}

export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const response = await axios.get<Order>(`/api/orders/${orderId}`)
      return response.data
    },
    enabled: !!orderId,
  })
}
