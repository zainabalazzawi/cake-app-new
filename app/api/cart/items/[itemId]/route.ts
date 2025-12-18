import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/lib/auth";
import { prisma } from "@/lib/prisma";
import { CartItemUpdateData } from "@/types";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { itemId } = await params;
    const body = await request.json();
    const { quantity, includeCandle, includeBirthdayCard, personalizedMessage } = body;

    // Verify cart item belongs to user's cart
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cart: {
          userId: session.user.id,
        },
      },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    // Validate and update - validation happens inside the data object
    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: {
        quantity: quantity !== undefined && quantity < 1 
          ? (() => { throw { status: 400, message: "Quantity must be at least 1" }; })()
          : quantity,
        includeCandle,
        includeBirthdayCard,
        personalizedMessage: personalizedMessage || null,
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { error: "Failed to update cart item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { itemId } = await params;

    // Verify ownership before deleting - check cartItem belongs to user's cart
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cart: {
          userId: session.user.id,
        },
      },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return NextResponse.json(
      { error: "Failed to delete cart item" },
      { status: 500 }
    );
  }
}

