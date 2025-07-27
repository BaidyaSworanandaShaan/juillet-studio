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
                    <div className="w-[100px] h-[100px] relative overflow-hidden rounded">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill // makes the image fill the parent div
                        className="object-cover rounded"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        Rs. {item.price} × {item.quantity}
                      </p>
                      <p className="font-semibold">
                        Rs. {item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end items-center gap-4 flex-col md:flex-row">
              <p className="text-lg font-bold">
                Total:{" "}
                <span className="text-black">Rs. {totalPrice.toFixed(2)}</span>
              </p>
              <Link href="/categories/all">
                <button className="btn-primary">Continue Shopping</button>
              </Link>
              <Link href="/checkout">
                <button className="btn-primary">Go To Checkout</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
