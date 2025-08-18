import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const productsData = [
    // Phones (4)
    {
      name: "iPhone 14",
      image: "/image/products/phone1.jfif",
      description: "Latest Apple iPhone with amazing camera",
      price: 1200,
      quantity: 50,
      category: "Phone",
      brand: "Apple",
      Model: "14 Pro",
      discount: 10,
    },
    {
      name: "Samsung Galaxy S23",
      image: "/image/products/phone2.jfif",
      description: "High performance Android phone",
      price: 1000,
      quantity: 40,
      category: "Phone",
      brand: "Samsung",
      Model: "S23 Ultra",
      discount: 5,
    },
    {
      name: "OnePlus 11",
      image: "/image/products/phone3.jfif",
      description: "Fast and smooth performance",
      price: 800,
      quantity: 30,
      category: "Phone",
      brand: "OnePlus",
      Model: "11 Pro",
    },
    {
      name: "Google Pixel 8",
      image: "/image/products/phone4.jfif",
      description: "Excellent camera and pure Android experience",
      price: 900,
      quantity: 25,
      category: "Phone",
      brand: "Google",
      Model: "Pixel 8",
    },

    // Laptops (2)
    {
      name: "MacBook Pro 16",
      image: "/image/products/laptop1.jfif",
      description: "Powerful laptop for professionals",
      price: 2500,
      quantity: 15,
      category: "Laptop",
      brand: "Apple",
      Model: "16-inch M2",
    },
    {
      name: "Dell XPS 15",
      image: "/image/products/laptop2.jfif",
      description: "High performance Windows laptop",
      price: 2000,
      quantity: 20,
      category: "Laptop",
      brand: "Dell",
      Model: "XPS 15",
    },

    // Power Banks (2)
    {
      name: "Anker PowerCore 10000",
      image: "/image/products/powerbank1.jfif",
      description: "Compact and fast charging power bank",
      price: 50,
      quantity: 100,
      category: "Power bank",
      brand: "Anker",
      Model: "PowerCore 10000",
    },
    {
      name: "Xiaomi 20000mAh",
      image: "/image/products/powerbank2.jfif",
      description: "High capacity power bank",
      price: 60,
      quantity: 80,
      category: "Power bank",
      brand: "Xiaomi",
      Model: "Mi 20000",
    },

    // Power Adapters (2)
    {
      name: "Apple 20W Adapter",
      image: "/image/products/adapter1.jfif",
      description: "Fast charging wall adapter",
      price: 30,
      quantity: 60,
      category: "Power Adapter",
      brand: "Apple",
      Model: "20W",
    },
    {
      name: "Samsung 25W Adapter",
      image: "/image/products/adapter2.jfif",
      description: "Quick charge adapter for Samsung phones",
      price: 25,
      quantity: 50,
      category: "Power Adapter",
      brand: "Samsung",
      Model: "25W",
    },
  ];

  for (const product of productsData) {
    await prisma.product.create({ data: product });
  }

  console.log("Seeded products with .jfif images successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
