import React from "react";
import FloatingCartButton from "../components/FloatingCartButton";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <FloatingCartButton />
    </>
  );
}
