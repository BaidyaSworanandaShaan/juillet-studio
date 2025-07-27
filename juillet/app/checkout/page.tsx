"use client";
import React from "react";
import SecondaryBanner from "../components/SecondaryBanner";
import { useFormik } from "formik";

import { checkoutSchema } from "../schema/checkoutSchema";
import { useCart } from "../context/CartContext";
import { createOrder } from "../lib/api";
import { useOrder } from "../context/OrderContext";
import { useRouter } from "next/navigation";
const Checkout = () => {
  const router = useRouter();
  const { cartItems, setCartItems } = useCart();
  const { setOrderConfirmed } = useOrder();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobileNumber: "",
      location: "",
      detailedAddress: "",
    },
    validationSchema: checkoutSchema,
    onSubmit: async (values) => {
      const orderPaylod = {
        ...values,
        totalAmount: totalPrice,
        products: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          category: item.category,
          images: item.images,
          availability: item.availability,
        })),
      };

      try {
        const result = await createOrder(orderPaylod);
        console.log("Order created:", result);
        formik.resetForm();
        setCartItems([]);
        setOrderConfirmed(true);
        router.push("/order-confirmed");
      } catch (err) {
        console.error("Order creation failed", err);
      }
    },
  });
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <div>
      <SecondaryBanner
        title="Checkout"
        subtitle="Review your items and proceed with a secure checkout experience."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories/all" },

          { label: "Checkout" },
        ]}
      />
      <div className="checkout my-10 grid grid-cols-1">
        <h1 className="font-bold text-xl mb-5">Delivery Details</h1>
        <div className="flex gap-10 flex-col lg:flex-row">
          <form onSubmit={formik.handleSubmit} className="order-2 lg:order-1">
            <div className="grid grid-cols-1 gap-6   lg:grid-cols-4">
              {/* Name */}
              <div>
                <label className="block mb-1 font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border px-3 py-2 rounded w-full"
                  placeholder="Your full name"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-600 text-sm mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border px-3 py-2 rounded w-full"
                  placeholder="example@mail.com"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block mb-1 font-semibold">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formik.values.mobileNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border px-3 py-2 rounded w-full"
                  placeholder="e.g. +977 98XXXXXXXX"
                />
                {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                  <p className="text-red-600 text-sm mt-1">
                    {formik.errors.mobileNumber}
                  </p>
                )}
              </div>

              {/* Valley Dropdown */}
              <div>
                <label className="block mb-1 font-semibold">Location</label>
                <select
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border px-3 py-2 rounded w-full"
                >
                  <option value="" disabled>
                    Select location
                  </option>
                  <option value="insideValley">Inside Valley</option>
                  <option value="outsideValley">Outside Valley</option>
                </select>
                {formik.touched.location && formik.errors.location && (
                  <p className="text-red-600 text-sm mt-1">
                    {formik.errors.location}
                  </p>
                )}
              </div>

              {/* Detailed Address (full width) */}
              <div className="md:col-span-3">
                <label className="block mb-1 font-semibold">
                  Detailed Address
                </label>
                <textarea
                  name="detailedAddress"
                  value={formik.values.detailedAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border px-3 py-2 rounded w-full"
                  rows={5}
                  placeholder="Street, ward number, municipality, etc."
                />
                {formik.touched.detailedAddress &&
                  formik.errors.detailedAddress && (
                    <p className="text-red-600 text-sm mt-1">
                      {formik.errors.detailedAddress}
                    </p>
                  )}
              </div>
            </div>
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
              className={` p-2 rounded mt-4 ${
                formik.isValid
                  ? "btn-primary"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Submit
            </button>{" "}
          </form>
          <div className="bg-gray-100 p-6 rounded-lg  w-full max-w-sm h-[200px] order-1 lg:order-2">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>Rs.{totalPrice}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Rs.0</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>Rs.{totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
