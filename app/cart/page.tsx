"use client";
import Image from "next/image";
import Link from "next/link";
import SecondaryBanner from "../components/SecondaryBanner";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems } = useCart();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <SecondaryBanner
        title={"Your Shopping Cart"}
        subtitle={
          "Review the items you've lovingly selected before checking out."
        }
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories/all" },
          { label: "Cart" },
        ]}
      />

      <div className="container mx-auto p-6">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p>Your cart is empty.</p>
            <Link href="/" className="text-blue-600 underline mt-4 block">
              ← Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border p-4 rounded "
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.images?.[0] || "/placeholder.jpg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        Rs. {item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    Rs. {item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end items-center gap-4">
              <p className="text-lg font-bold">
                Total:{" "}
                <span className="text-black">Rs. {totalPrice.toFixed(2)}</span>
              </p>
              <Link href="/categories/all">
                <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
                  Continue Shopping
                </button>
              </Link>
              <Link href="/checkout">
                <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
                  Go To Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
