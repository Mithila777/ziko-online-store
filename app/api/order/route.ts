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

  // 1️⃣ Create the order
  const order = await prisma.order.create({
    data: {
      userId: sessionUser.user.id,
      paymentMethod,
      paymentStatus: paymentMethod === 'stripe' ? 'paid' : 'pending',
      dailybariStatus: 'Panding', // initial status
      items: {
        create: items.map((item: any) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      },
    },
    include: {
      items: true, // include items to update stock later
    },
  });

  // 2️⃣ If payment is COD or already paid, decrease stock immediately
  if (paymentMethod !== 'stripe' || order.paymentStatus === 'paid') {
    await prisma.$transaction(
      order.items.map((item) =>
        prisma.product.update({
          where: { id: item.productId },
          data: { quantity: { decrement: item.quantity } },
        })
      )
    );
  }

  // 3️⃣ Stripe checkout session
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
    });

    return NextResponse.json({ url: session.url });
  }

  return NextResponse.json({ success: true, orderId: order.id });
}
