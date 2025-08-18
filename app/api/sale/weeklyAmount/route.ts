import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const today = new Date();
    const last7Days = new Date();
    last7Days.setDate(today.getDate() - 6);

    const orders = await prisma.order.findMany({
      where: {
        createdAt: { gte: last7Days, lte: today },
      },
      include: { items: { include: { product: true } } },
    });

    const salesByDay: { [key: string]: number } = {};

    // Initialize last 7 days
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      salesByDay[key] = 0;
    }

    // Sum total amount per day
    orders.forEach(order => {
      const dateKey = order.createdAt.toISOString().slice(0, 10);
      const totalAmount = order.items.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
      );
      if (salesByDay[dateKey] !== undefined) salesByDay[dateKey] += totalAmount;
    });

    const result = Object.keys(salesByDay)
      .sort()
      .map(date => ({ date, totalAmount: salesByDay[date] }));

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch weekly sales" }, { status: 500 });
  }
}
