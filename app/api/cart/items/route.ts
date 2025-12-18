import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId, quantity, includeCandle, includeBirthdayCard, personalizedMessage } = body;

    // Get product to fetch price
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: session.user.id },
      });
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
        includeCandle: includeCandle || false,
        includeBirthdayCard: includeBirthdayCard || false,
        personalizedMessage: personalizedMessage || null,
      },
    });

    let cartItem;

    if (existingItem) {
      // Update quantity if item already exists
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
          price: product.price,
        },
        include: {
          product: true,
        },
      });
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          includeCandle: includeCandle || false,
          includeBirthdayCard: includeBirthdayCard || false,
          personalizedMessage: personalizedMessage || null,
          price: product.price,
        },
        include: {
          product: true,
        },
      });
    }

    return NextResponse.json(cartItem, { status: 201 });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}

