'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map(item => (
              <li key={item.id} className="gap-4 items-center bg-white p-4 rounded shadow">
              <div className='flex justify-around '>
                <div className="">
                  <p className="font-medium">{item.name}</p>
                </div>
               <img src={item.image} alt={item.name} width={80} height={80} /> 
                 <p className="text-sm text-gray-600">${item.price} each</p>
                  <p>Quantity: {item.quantity}</p>


                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline"
                ><FaTrash/> 
                </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={clearCart}
                className="bg-gray-200 px-4 py-2 rounded"
              >
                Clear Cart
              </button>

              <Link href="/checkout" className="bg-green-500 text-white px-4 py-2 rounded">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
