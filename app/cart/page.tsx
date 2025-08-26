'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, addToCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Increase quantity by re-adding the same item
  const increaseQuantity = (item: any) => {
    addToCart({ ...item, quantity: 1 }); // add one more
  };

  // Decrease quantity manually
  const decreaseQuantity = (item: any) => {
    if (item.quantity > 1) {
      // remove one and re-add with quantity - 1
      removeFromCart(item.id);
      addToCart({ ...item, quantity: item.quantity - 1 });
    }
  };

  return (
    <main className="p-2  md:p-10">
      <h1 className="text-xl md:text-3xl font-bold mb-4 uppercase">Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map(item => (
              <li
                key={item.id}
                className="flex justify-between   bg-white p-1  md:p-4 rounded shadow"
              >
                {/* Product Info */}
                <div className="flex items-center gap-1 md:gap-4">
                  <img src={item.image} alt={item.name} width={80} height={80} />
                  <div>
                    <p className="font-normal text-sm md:font-medium ">{item.name}</p>
                    <p className="text-sm text-gray-600">${item.price} each</p>
                  </div>
                </div>

              {/* Quantity Controls */}
<div className="flex items-center text-sm space-x-1 md:space-x-2">
  {/* Decrease */}
  <button
    onClick={() => decreaseQuantity(item)}
    className="flex justify-center items-center w-6 h-6 md:w-8 md:h-8 border rounded hover:bg-gray-100 disabled:opacity-50"
    disabled={item.quantity <= 1}
  >
    <FaMinus className="text-xs md:text-sm" />
  </button>

  {/* Quantity Display */}
  <span className="flex justify-center items-center w-6 h-6 md:w-8 md:h-8 border-y text-center text-xs md:text-sm">
    {item.quantity}
  </span>

  {/* Increase */}
  <button
    onClick={() => increaseQuantity(item)}
    className="flex justify-center items-center w-6 h-6 md:w-8 md:h-8 border rounded hover:bg-gray-100"
  >
    <FaPlus className="text-xs md:text-sm" />
  </button>
</div>

                {/* Item Total */}
                <p className="font-semibold text-sm ">${(item.price * item.quantity).toFixed(2)}</p>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>

          {/* Cart Total */}
          <div className="mt-6">
            <p className=" text-sm md:text-xl font-semibold">Total: ${total.toFixed(2)}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={clearCart}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Clear Cart
              </button>

              <Link
                href="/checkout"
                className="bg-green-500 text-white  px-2 md:px-4 py-2 rounded hover:bg-green-600"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
