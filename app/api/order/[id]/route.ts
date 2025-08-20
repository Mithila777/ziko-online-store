import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



export async function PUT(req: Request,{ params }: { params: Promise<{ id: string }> }) {
  const {id}= await params
   try {
    const data = await req.json();

    const updatedOrder = await prisma.order.update({
      where: { id: id },
      data: {
       dailybariStatus   : data.deliveryStatus,
        paymentStatus: data.paymentStatus,
      }
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
