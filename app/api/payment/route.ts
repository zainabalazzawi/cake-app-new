import { SquareClient, SquareEnvironment } from "square";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";

const square = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.SQUARE_ENVIRONMENT === "production"
    ? SquareEnvironment.Production
    : SquareEnvironment.Sandbox,
});

export async function POST(request: Request) {
  try {
    const { sourceId, amount, orderId } = await request.json();

    if (!sourceId || !amount || !orderId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { payment } = await square.payments.create({
      idempotencyKey: randomUUID(),
      sourceId,
      amountMoney: { currency: "USD", amount: BigInt(Math.round(amount * 100)) },
      locationId: process.env.SQUARE_LOCATION_ID,
    });

    if (!payment?.id) {
      return NextResponse.json({ error: "Payment failed" }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus: "completed", paymentMethod: "card", paymentId: payment.id, paidAt: new Date() },
    });

    return NextResponse.json({ success: true, paymentId: payment.id, order });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json({ error: "Payment failed" }, { status: 500 });
  }
}
