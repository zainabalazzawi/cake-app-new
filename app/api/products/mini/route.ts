import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: 'mini'
      },
      orderBy: {
        createdAt: 'asc'
      }
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching mini cakes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch mini cakes' },
      { status: 500 }
    )
  }
}

