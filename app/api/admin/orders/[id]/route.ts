import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request,{ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; 

    await prisma.$transaction([
      prisma.orderItem.deleteMany({ where: { orderId: id } }),
      prisma.order.delete({ where: { id } }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to cancel order" },
      { status: 500 }
    );
  }
}
