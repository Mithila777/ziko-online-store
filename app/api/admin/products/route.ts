import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST add new product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, image, description, price, quantity, category, brand, Model, discount } = body;

    if (!name || !description || !price || !quantity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        image,
        description,
        price: Number(price),
        quantity: Number(quantity),
        category,
        brand,
        Model,
        discount: discount ? Number(discount) : null,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}
