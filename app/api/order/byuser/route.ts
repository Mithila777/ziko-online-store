import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      items: { include: { product: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const ordersWithTotal = orders.map((order) => ({
    id: order.id,
    createdAt: order.createdAt,
    totalAmount: order.items.reduce(
      (sum, item) => sum + (item.product.price || 0) * item.quantity,
      0
    ),
    paymentStatus: order.paymentStatus,
    dailybariStatus: order.dailybariStatus,
    items: order.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.image
          ? item.product.image.startsWith("/image")
            ? item.product.image
            : `/image/${item.product.image}`
          : "/image/no-image.png", // fallback
      },
    })),
  }));

  return new Response(JSON.stringify(ordersWithTotal), { status: 200 });
}
