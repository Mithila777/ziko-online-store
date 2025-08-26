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
                className="flex justify-between items-center  bg-white p-1  md:p-4 rounded shadow"
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
                <div className="flex items-centter text-sm">
                  <button
                    onClick={() => decreaseQuantity(item)}
                    className=" p-1 md:p-2 border"
                    disabled={item.quantity <= 1}
                  >
                    <FaMinus />
                  </button>
                  <span className=" p-1 md:p-2 border-y">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item)}
                    className="p-1  md:p-2 border"
                  >
                    <FaPlus />
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
