"use client";
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Product } from "../types/product";

type Props = {
  product: Product;
};
export enum actionType {
  INCREMENT = "Increment",
  DECREMENT = "Decerement",
}

const AddToCart = ({ product }: Props) => {
  const { cartItems, setCartItems } = useCart();

  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    const itemExists = cartItems.find((item) => item.id === product.id);
    if (itemExists) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...product, quantity }]);
    }
  };
  console.log(cartItems);
  const handleProductQuantityChange = (
    productId: number,
    action: actionType
  ) => {
    if (action === actionType.INCREMENT) {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => Math.max(1, prev - 1));
    }
  };
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => {
            handleProductQuantityChange(product.id, actionType.DECREMENT);
          }}
          className="bg-gray-300 px-3 py-1 text-black rounded hover:bg-gray-400 transition"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="min-w-[24px] text-center">{quantity}</span>
        <button
          onClick={() => {
            handleProductQuantityChange(product.id, actionType.INCREMENT);
          }}
          className="bg-gray-300 px-3 py-1 text-black rounded hover:bg-gray-400 transition"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <button
        className="btn-primary !p-2 flex-1 min-w-[120px] text-center"
        onClick={() => handleAddToCart()}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCart;
