import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// define a params type for clarity
type Params = {
  params: {
    id: string;
  };
};

export async function DELETE(req: Request, { params }: Params) {
  try {
    const { id } = params;

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
