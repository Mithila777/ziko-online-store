import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// define a params type for clarity
type Params = {
  params: {
    id: string;
  };
};

export async function PUT(req: Request, { params }: Params) { 
   try {
    const data = await req.json();

    const updatedOrder = await prisma.order.update({
      where: { id: params.id },
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
