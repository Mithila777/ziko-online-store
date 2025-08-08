This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:
Next.js Fullstack Online Electronics Shop

##Project Overview
This is a full-stack eCommerce web application for an online electronics store built using Next.js 14 (App Router). It allows users to browse products, manage a shopping cart, place orders, and make payments securely via Stripe Checkout. The site includes an Admin Dashboard to manage products and orders.

##Tech Stack
Frontend: Next.js (App Router), Tailwind CSS, React Hooks, Client Components
Backend: Next.js API Routes, Prisma ORM
Authentication: NextAuth.js (with Email or OAuth options)
Database: PostgreSQL
Payments: Stripe

##State Management: React Context API (for Cart)
Deployment: Vercel (Frontend & API) + (PostgreSQL)

##Features
🛍️ Customer Side
View all electronic products (e.g., phones, laptops, accessories)
Filter and search products (optional)
Add products to cart
Choose Pay Now (Stripe) or Cash on Delivery
View order confirmation after checkout

👨‍💼 Admin Dashboard
Secure login with Admin role
Add new products (with name, image, price, description)
Update or delete existing products
View all orders placed by users

🔐 Authentication
Users must sign in to place an order
Role-based access (Admin vs User)





Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
