"use client";
import { useOrder } from "@/app/context/OrderContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const OrderConfirmed = () => {
  const { orderConfirmed, setOrderConfirmed } = useOrder();
  const router = useRouter();
  const [checked, setChecked] = useState(false); // track if check done

  useEffect(() => {
    if (!orderConfirmed) {
      router.replace("/");
    } else {
      setChecked(true);
    }
  }, [orderConfirmed, router, setOrderConfirmed]);

  if (!checked) {
    // or show loading spinner or blank
    return null;
  }

  return (
    <div className="text-center py-10">
      <h1 className="text-3xl font-bold text-green-600">Order Confirmed!</h1>
      <p className="mt-4">Thank you for your purchase.</p>
    </div>
  );
};

export default OrderConfirmed;
