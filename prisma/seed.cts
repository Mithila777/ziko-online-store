import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const products = [
    // Laptops
    {
      name: "MacBook Pro 14-inch",
      image: "image/products/MacBook-Pro14.jfif",
      description: "Apple MacBook Pro 14-inch with M1 Pro chip.",
      price: 199900,
      quantity: 20,
      category: "Laptop",
      brand: "Apple",
      Model: "MacBook Pro 14",
    },
    {
      name: "Dell XPS 13",
      image: "image/products/Dell-XPS13.jfif",
      description: "Dell XPS 13 with Intel i7 processor.",
      price: 149900,
      quantity: 25,
      category: "Laptop",
      brand: "Dell",
      Model: "XPS 13",
    },
    // AirPods
    {
      name: "Apple AirPods Pro",
      image: "image/products/Apple-AirPods-Pro.jfif",
      description: "Apple AirPods Pro with active noise cancellation.",
      price: 24900,
      quantity: 60,
      category: "AirPods",
      brand: "Apple",
      Model: "AirPods Pro",
    },
    {
      name: "AirPods 3rd Gen",
      image: "image/products/AirPods-3rd-Gen.jfif",
      description: "Apple AirPods 3rd generation with spatial audio.",
      price: 19900,
      quantity: 50,
      category: "AirPods",
      brand: "Apple",
      Model: "AirPods 3rd Gen",
    },
    // Watches
    {
      name: "Apple Watch Series 7",
      image: "image/products/Apple-Watch-Series7.jfif",
      description: "Apple Watch Series 7 with larger display.",
      price: 39900,
      quantity: 40,
      category: "Watch",
      brand: "Apple",
      Model: "Watch Series 7",
    },
    {
      name: "Samsung Galaxy Watch 4",
      image: "image/products/Samsung-Galaxy-Watch4.jfif",
      description: "Samsung Galaxy Watch 4 with fitness tracking.",
      price: 29900,
      quantity: 35,
      category: "Watch",
      brand: "Samsung",
      Model: "Galaxy Watch 4",
    },
    // Headphones
    {
      name: "Bose QuietComfort 45",
      image: "image/products/Bose-QuietComfort45.jfif",
      description: "Bose noise-cancelling wireless headphones.",
      price: 34900,
      quantity: 45,
      category: "Headphones",
      brand: "Bose",
      Model: "QuietComfort 45",
    },
    {
      name: "Sony WH-1000XM4",
      image: "image/products/Sony-WH-1000XM4.jfif",
      description: "Sony WH-1000XM4 wireless noise cancelling headphones.",
      price: 32900,
      quantity: 40,
      category: "Headphones",
      brand: "Sony",
      Model: "WH-1000XM4",
    },
  ];

  for (const product of products) {
    // Use create or createMany; here we do one by one to avoid duplicates if you want
    await prisma.product.create({ data: product });
  }

  console.log("✅ Seeded new products successfully (existing products kept).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
