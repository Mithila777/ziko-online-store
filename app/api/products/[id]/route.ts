// Handles: GET (single), PUT (update), DELETE
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // ✅ await params
  const product = await prisma.product.findUnique({
    where: { id },
  });
  return NextResponse.json(product);
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await req.json();
  const { name, description, price, image, quantity, category, brand, Model, discount } = body;

  const updated = await prisma.product.update({
    where: { id },
    data: { name, description, price, image, quantity, category, brand, Model, discount },
  });

  return NextResponse.json(updated);
}



export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // ✅ await params
  await prisma.product.delete({
    where: { id },
  });
  return NextResponse.json({ message: "Product deleted." });
}
