'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    quantity: '',
  });

  // Fetch existing product data on mount
  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct({
          name: data.name || '',
          price: data.price?.toString() || '',
          image: data.image || '',
          description: data.description || '',
          quantity: data.amount?.toString() || '',
        });
      });
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: product.name,
        price: Number(product.price),
        image: product.image,
        description: product.description,
        quantity: Number(product.quantity),
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    router.push('/admin');
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          placeholder="Name"
          required
          className="w-full border p-2 rounded"
        />
        <input
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          placeholder="Price"
          type="number"
          required
          className="w-full border p-2 rounded"
        />
        <input
          value={product.image}
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
          placeholder="Image URL"
          className="w-full border p-2 rounded"
        />
        <input
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />
        <input
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
          placeholder="Stock Amount"
          type="number"
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </main>
  );
}
