'use client';

import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'cod' | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect to login if not logged in
  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn(); // opens login page
    }
  }, [status]);

  const handleConfirm = async () => {
    if (!paymentMethod) return alert('Select a payment method');

    setLoading(true);

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          paymentMethod,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Order creation failed: ${res.status} - ${errorText}`);
      }

      const data = await res.json();

      if (paymentMethod === 'stripe' && data.url) {
        window.location.href = data.url;
      } else {
        clearCart();
     
        router.push('/user');
      }
    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while session is being checked
  if (status === 'loading') {
    return <p className="p-6">Checking authentication...</p>;
  }

  return (
    <main className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <p className="mb-2">Choose payment method:</p>
      <div className="flex gap-4 mb-4">
        <button
          className={`border px-4 py-2 rounded ${paymentMethod === 'stripe' ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => setPaymentMethod('stripe')}
        >
          Pay Now (Stripe)
        </button>
        <button
          className={`border px-4 py-2 rounded ${paymentMethod === 'cod' ? 'bg-green-500 text-white' : ''}`}
          onClick={() => setPaymentMethod('cod')}
        >
          Cash on Delivery
        </button>
      </div>

      <button
        className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        onClick={handleConfirm}
        disabled={loading || !paymentMethod}
      >
        {loading ? 'Processing...' : 'Confirm Order'}
      </button>
    </main>
  );
}
