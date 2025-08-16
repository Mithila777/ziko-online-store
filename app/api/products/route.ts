// Handles: GET (all), POST (add)
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      description,
      price,
      image,
      quantity,
      category,
      brand,
      Model,
      discount,
    } = body;

    // Basic validation
    if (!name || !description || price === undefined || !image || quantity === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        image: image.trim(),
        quantity: Number(quantity),
        category: category ? category.trim() : null,
        brand: brand ? brand.trim() : null,
        Model: Model ? Model.trim() : null,
        discount: discount !== undefined && discount !== null ? Number(discount) : null,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("POST /products error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
