import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: 'celebration'
      },
      orderBy: {
        createdAt: 'asc'
      }
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching celebration cakes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch celebration cakes' },
      { status: 500 }
    )
  }
}

