import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-[#C64636]/10">
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold text-base line-clamp-1 text-[#5D4037] group-hover:text-[#C64636] transition-colors">
            {product.name}
          </h3>
          <Badge variant="price" className="px-3 py-1 text-sm shrink-0">
            {formatPrice(product.price)}
          </Badge>
        </div>
        <Link href={`/products/${product.slug}`}>
          <Button variant="outline-red" size="sm" className="w-full text-sm">
            View Details
            <ArrowRight className="w-3 h-3" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

