import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Get current date
    const today = new Date();
    const last7Days = new Date();
    last7Days.setDate(today.getDate() - 6); // last 7 days including today

    // Fetch orders in the last 7 days
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: last7Days,
          lte: today,
        },
      },
      include: {
        items: true,
      },
    });

    // Initialize sales per day
    const salesByDay: { [key: string]: number } = {};

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const key = d.toISOString().slice(0, 10); // YYYY-MM-DD
      salesByDay[key] = 0;
    }

    // Sum total for each day
    orders.forEach((order) => {
      const dateKey = order.createdAt.toISOString().slice(0, 10);
      const total = order.items.reduce((acc, item) => acc + item.quantity, 0);
      if (salesByDay[dateKey] !== undefined) salesByDay[dateKey] += total;
    });

    // Convert to array for chart
    const result = Object.keys(salesByDay)
      .sort()
      .map((date) => ({ date, total: salesByDay[date] }));

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch weekly sales" }, { status: 500 });
  }
}
