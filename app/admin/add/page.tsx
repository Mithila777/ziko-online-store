'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage({ productId }: { productId?: string }) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    quantity: '',
    category: '',
    brand: '',
    model: '',
    disscount: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // ✅ Fetch product if editing
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();

        setForm({
          name: data.name || '',
          price: data.price?.toString() || '',
          image: data.image || '',
          description: data.description || '',
          quantity: data.quantity?.toString() || '',
          category: data.category || '',
          brand: data.brand || '',
          model: data.Model || '',
          disscount: data.discount?.toString() || '',
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [productId]);

  // ✅ Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const url = productId ? `/api/products/${productId}` : '/api/products';
      const method = productId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: JSON.stringify({
          name: form.name.trim(),
          price: Number(form.price),
          image: form.image.trim(),
          description: form.description.trim(),
          quantity: Number(form.quantity),
          category: form.category.trim(),
          brand: form.brand.trim(),
          Model: form.model.trim(),
          discount: form.disscount ? Number(form.disscount) : null,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error(productId ? 'Failed to update product' : 'Failed to add product');

      alert(productId ? 'Product updated successfully!' : 'Product added successfully!');
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Reusable row
  const InputRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex items-center gap-4">
      <label className="w-32 font-medium">{label}</label>
      <div className="flex-1">{children}</div>
    </div>
  );

  return (
    <main className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">
        {productId ? 'Update Product' : 'Add New Product'}
      </h1>

      {error && <p className="mb-4 text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputRow label="Product Name">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
            className="w-full border rounded-lg p-2"
          />
        </InputRow>

        <InputRow label="Price ($)">
          <input
            name="price"
            type="number"
            min="0"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
            className="w-full border rounded-lg p-2"
          />
        </InputRow>

        <InputRow label="Image URL">
          <div>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Paste product image URL"
              className="w-full border rounded-lg p-2"
            />
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="mt-2 w-24 h-24 object-cover rounded border"
              />
            )}
          </div>
        </InputRow>

        <InputRow label="Description">
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows={3}
            className="w-full border rounded-lg p-2"
          />
        </InputRow>

        <InputRow label="Quantity">
          <input
            name="quantity"
            type="number"
            min="0"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Available stock quantity"
            required
            className="w-full border rounded-lg p-2"
          />
        </InputRow>

        <InputRow label="Category">
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Electronics, Clothing"
            className="w-full border rounded-lg p-2"
          />
        </InputRow>

        <InputRow label="Brand">
          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="e.g. Apple, Nike"
            className="w-full border rounded-lg p-2"
          />
        </InputRow>

        <InputRow label="Model">
          <input
            name="model"
            value={form.model}
            onChange={handleChange}
            placeholder="e.g. iPhone 14"
            className="w-full border rounded-lg p-2"
          />
        </InputRow>

        <InputRow label="Discount (%)">
          <input
            name="disscount"
            type="number"
            min="0"
            max="100"
            value={form.disscount}
            onChange={handleChange}
            placeholder="Enter discount percentage"
            className="w-full border rounded-lg p-2"
          />
        </InputRow>

        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Saving...' : productId ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </main>
  );
}
