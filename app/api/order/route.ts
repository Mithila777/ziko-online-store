import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(req: Request) {
  const { items, paymentMethod } = await req.json();
  const sessionUser = await getServerSession(authOptions);

  if (!sessionUser?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ✅ Calculate total cost
  const totalCost = items.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  // 1️⃣ Create order in DB
  const order = await prisma.order.create({
    data: {
      userId: sessionUser.user.id,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'unpaid' : 'pending',
      dailybariStatus: paymentMethod === 'cod' ? 'Confirmed' : 'Pending',
      totalCost,
      items: {
        create: items.map((item: any) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      },
    },
    include: { items: true },
  });

  // 2️⃣ If COD → decrement stock immediately
  if (paymentMethod === 'cod') {
    await prisma.$transaction(
      order.items.map((item) =>
        prisma.product.update({
          where: { id: item.productId },
          data: { quantity: { decrement: item.quantity } },
        })
      )
    );

    return NextResponse.json({ success: true, orderId: order.id });
  }

  // 3️⃣ If Stripe → create checkout session
  if (paymentMethod === 'stripe') {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: { name: item.name },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      metadata: { orderId: order.id }, // ✅ we’ll use this in webhook
    });

    return NextResponse.json({ url: session.url });
  }

  return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 });
}
