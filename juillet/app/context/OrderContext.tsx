"use client";
import { createContext, useContext, useState } from "react";

const OrderContext = createContext<any>(null);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  return (
    <OrderContext.Provider value={{ orderConfirmed, setOrderConfirmed }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
