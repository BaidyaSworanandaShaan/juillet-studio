import products from "../../../data/product.json";
import React from "react";
import Image from "next/image";
import SecondaryBanner from "../../../components/SecondaryBanner";
import AddToCart from "../../../components/AddToCart";
import { Product } from "../../../types/product";

type Props = {
  params: {
    id: string;
  };
};

// Type the product data
const typedProducts: Product[] = products;

const ProductPage = ({ params }: Props) => {
  const productId = parseInt(params.id);
  console.log(typedProducts);
  // Find product with matching ID
  const product = typedProducts.find((p) => p.id === productId);

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
      <div className="flex mt-5">
        <div className="w-2/5 p-4">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-auto"
          />
        </div>
        <div className="w-3/5 bg-white p-4">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-2">Category: {product.category}</p>
          <p className="text-lg font-semibold text-green-700 mb-2">
            Rs. {product.price}
          </p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p
            className={`text-sm font-medium ${
              product.availability === "InStock"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {product.availability === "InStock" ? "In Stock" : "Out of Stock"}
          </p>
          <AddToCart productId={product.id} />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
