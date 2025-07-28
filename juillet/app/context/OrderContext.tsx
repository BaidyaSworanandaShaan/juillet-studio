"use client";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
type OrderContextType = {
  orderConfirmed: boolean;
  setOrderConfirmed: Dispatch<SetStateAction<boolean>>;
};
const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  return (
    <OrderContext.Provider value={{ orderConfirmed, setOrderConfirmed }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
