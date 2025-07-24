"use client";
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/cartitems";
import products from "..//data/product.json";
type Props = {
  productId: number;
};
export enum actionType {
  INCREMENT = "Increment",
  DECREMENT = "Decerement",
}

const AddToCart = ({ productId }: Props) => {
  const { cartItems, setCartItems } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const handleAddToCart = ({
    productId,
    quantity,
  }: {
    productId: number;
    quantity: number;
  }) => {
    const product = products.find((product) => product.id === productId);
    if (!product) {
      return;
    }
    const itemExists = cartItems.find((item) => item.id === productId);
    if (itemExists) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId
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
    <div className="flex items-center gap-2 mt-4">
      <button
        onClick={() => {
          handleProductQuantityChange(productId, actionType.DECREMENT);
        }}
        className="bg-gray-300 px-2 py-1 text-black rounded"
      >
        −
      </button>
      <span>{quantity}</span>
      <button
        onClick={() => {
          handleProductQuantityChange(productId, actionType.INCREMENT);
        }}
        className="bg-gray-300 px-2 py-1 text-black rounded"
      >
        +
      </button>
      <button
        className="bg-black p-2 text-white my-4 block hover:bg-white hover:text-black transition-colors"
        onClick={() => handleAddToCart({ productId, quantity })}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCart;
