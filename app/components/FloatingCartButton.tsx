"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { actionType } from "./AddToCart";
import Link from "next/link";

export default function FloatingCartButton() {
  const { cartItems, setCartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const removeFromCart = (productId: number) => {
    const newCartItem = cartItems.filter((item) => item.id != productId);

    setCartItems(newCartItem);
  };

  const handleProductQuantityFromCart = (
    productId: number,
    action: actionType
  ) => {
    const itemExists = cartItems.find((item) => item.id === productId);

    if (itemExists) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity:
                  action === actionType.INCREMENT
                    ? item.quantity + 1
                    : Math.max(1, item.quantity - 1),
              }
            : item
        )
      );
    }
  };
  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-black text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
        aria-label="Open cart"
      >
        🛒
        {totalQuantity > 0 && (
          <span className="absolute top-1 right-1 bg-red-600 rounded-full px-2 text-xs font-bold">
            {totalQuantity}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed right-0 top-0 bottom-0 w-80 bg-white p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside sidebar
          >
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id} className="mb-3 border-b pb-2">
                    <p className="font-semibold">{item.name}</p>{" "}
                    <div className="my-2">
                      <button
                        onClick={() => {
                          handleProductQuantityFromCart(
                            item.id,
                            actionType.DECREMENT
                          );
                        }}
                        className="bg-gray-300 px-2 py-1 text-black rounded"
                      >
                        −
                      </button>
                      <span className="mx-2 ">{item.quantity}</span>
                      <button
                        onClick={() => {
                          handleProductQuantityFromCart(
                            item.id,
                            actionType.INCREMENT
                          );
                        }}
                        className="bg-gray-300 px-2 py-1 text-black rounded"
                      >
                        +
                      </button>
                    </div>
                    <p>
                      Price: Rs. {item.price} * {item.quantity} = Rs.
                      {item.price * item.quantity}{" "}
                    </p>{" "}
                    <button
                      className="cart-item-delete bg-red-700 p-2 text-white rounded-md border-none block mt-2"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}

                <li className="font-bold">Total Quantity: {totalQuantity} </li>
                <li className="font-bold">Total Price: Rs. {totalPrice}</li>
              </ul>
            )}

            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 mr-2"
            >
              Close
            </button>
            {cartItems.length > 0 && (
              <Link href="/cart">
                <button className="mt-6 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  Go To Cart
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
