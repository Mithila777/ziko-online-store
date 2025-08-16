import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(req: Request) {
  try {
    const { productId } = await req.json();
    await prisma.product.delete({ where: { id: productId } });
    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}

// PATCH: update product
export async function PATCH(req: Request) {
  try {
    const { id, name, price, quantity, category, brand, Model, discount, image, description } =
      await req.json();

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, price, quantity, category, brand, Model, discount, image, description },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}
