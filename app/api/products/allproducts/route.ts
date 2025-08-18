// Handles: GET (all with filters & pagination), POST (add)
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const minPrice = Number(searchParams.get("minPrice") || 0);
    const maxPrice = Number(searchParams.get("maxPrice") || 9999999);
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 8);
    const skip = (page - 1) * limit;

    // Build filters
    const where: any = {
      price: { gte: minPrice, lte: maxPrice },
    };
    if (category) where.category = { equals: category, mode: "insensitive" };
    if (brand) where.brand = { equals: brand, mode: "insensitive" };

    // Get total count for pagination
    const totalProducts = await prisma.product.count({ where });
    const totalPages = Math.ceil(totalProducts / limit);

    // Fetch products with pagination
    const products = await prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ products, totalPages });
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
