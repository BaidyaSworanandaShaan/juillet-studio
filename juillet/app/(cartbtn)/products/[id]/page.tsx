import React from "react";
import Image from "next/image";
import SecondaryBanner from "../../../components/SecondaryBanner";
import AddToCart from "../../../components/AddToCart";
import { fetchProductById, fetchProducts } from "@/app/lib/api";
import { Availability } from "@/app/types/availability";

type Props = {
  params: {
    id: string;
  };
};
export const revalidate = 60;
export async function generateStaticParams() {
  const products = await fetchProducts(); // fetch all products to get IDs

  return products.map((product: any) => ({
    id: product.id.toString(),
  }));
}
const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
const ProductPage = async ({ params }) => {
  const productId = parseInt(params.id);
  const product = await fetchProductById(productId);

  if (!product) {
    return <div className="p-4 text-red-600">Product not found</div>;
  }
  const { name, price, description, availability, images, category } =
    product.attributes;

  const imageUrls =
    images?.data?.map((img: any) => `${API_URL}${img.attributes.url}`) || [];

  if (!product) {
    return <div className="p-4 text-red-600">Product not found</div>;
  }

  return (
    <>
      <SecondaryBanner
        title={"Crafted with Care"}
        subtitle={"Explore the story, features, and beauty behind this item."}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories/all" },
          { label: "Product" },
        ]}
      />
      <div className="flex mt-5 gap-5 flex-col align-center sm:flex-row">
        <div className="p-4">
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className="relative w-64 h-60 mb-2 mx-auto md:mx-0 "
            >
              <Image
                src={url}
                alt={name}
                fill
                className="object-cover rounded"
              />
            </div>
          ))}
        </div>
        <div className=" bg-white p-4  text-center md:text-left">
          <h1 className="text-2xl font-bold mb-4">{name}</h1>
          <p className="text-gray-600 mb-2">
            Category: {category?.data?.attributes?.name || "Uncategorized"}
          </p>
          <p className="text-lg font-semibold text-green-700 mb-2">
            Rs. {price}
          </p>
          <p className="text-gray-700 mb-4 text-justify leading-7">
            {description}
          </p>
          <p
            className={`text-sm font-medium ${
              availability.toLowerCase() === Availability.InStock
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {availability.toLowerCase() === Availability.InStock
              ? "In Stock"
              : "Out of Stock"}
          </p>
          {availability.toLowerCase() === Availability.InStock && (
            <AddToCart product={product} />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
