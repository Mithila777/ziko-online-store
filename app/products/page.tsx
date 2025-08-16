'use client';
import ProductCard from '@/components/ProductCard';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from "@/types/product";



export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    };
    load();
  }, []);

  const handleCheckout = async (product: Product) => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ product }),
    });

    const data = await res.json();
    if (data?.url) {
      router.push(data.url); // Redirect to Stripe
    }
  };

  return (
    <main className='px-[10%] py-[4%] bg-gray-100'>
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
</main>
     
  );
}
