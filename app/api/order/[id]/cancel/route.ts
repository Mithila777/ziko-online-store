import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;

    // find order
    const order = await prisma.order.findUnique({ where: { id: orderId } });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // check if already paid
    if (order.paymentStatus !== "Unpaid") {
      return NextResponse.json(
        { error: "Paid orders cannot be cancelled" },
        { status: 400 }
      );
    }

    // check 24h limit
    const now = new Date();
    const createdAt = new Date(order.createdAt);
    const diffHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

    if (diffHours > 24) {
      return NextResponse.json(
        { error: "Orders older than 24h cannot be cancelled" },
        { status: 400 }
      );
    }

    // cancel order
    const cancelled = await prisma.order.update({
      where: { id: orderId },
      data: { dailybariStatus: "Cancelled" },
    });

    return NextResponse.json(cancelled);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to cancel order" },
      { status: 500 }
    );
  }
}
