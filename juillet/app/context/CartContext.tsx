"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "../types/product";

// 1. Cart Item type: product + quantity
export type CartItem = Product & { quantity: number };

// 2. Context type
type CartContextType = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

// 3. Create Context
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
// Clear Cart

// 4. Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
// 5. Custom Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
