import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await prisma.$queryRaw<
    { productId: string; totalQuantity: bigint }[]
  >`
    SELECT "productId", SUM(quantity) as "totalQuantity"
    FROM "OrderItem"
    GROUP BY "productId"
    ORDER BY "totalQuantity" DESC
    LIMIT 4;
  `;

  // Convert BigInt to Number
  const formatted = result.map(item => ({
    ...item,
    totalQuantity: Number(item.totalQuantity),
  }));

  return NextResponse.json(formatted);
}



