import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { Product } from '@/types'

// Fetch all products (celebration + mini)
export const useAllProducts = () => {
  return useQuery({
    queryKey: ['products', 'list'],
    queryFn: async () => {
      const [celebration, mini] = await Promise.all([
        axios.get<Product[]>('/api/products/celebration'),
        axios.get<Product[]>('/api/products/mini'),
      ])
      
      return {
        celebrationCakes: celebration.data,
        miniCakes: mini.data,
      }
    },
  })
}

// Fetch single product by slug
export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['products', 'detail', slug],
    queryFn: async () => {
      const { data } = await axios.get<Product>(`/api/products/${slug}`)
      return data
    },
  })
}

