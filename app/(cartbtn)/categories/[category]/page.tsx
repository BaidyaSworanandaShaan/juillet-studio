import SecondaryBanner from "../../../components/SecondaryBanner";

import products from "../../../data/product.json";
import React from "react";
import SideNav from "../../../components/SideNav";
import Link from "next/link";
import AddToCart from "../../../components/AddToCart";
import { Product } from "../../../types/product";
type Props = {
  params: {
    category: string;
  };
};
const typedProducts: Product[] = products;
const Category = ({ params }: Props) => {
  const category = params.category;
  const filteredProducts =
    category === "all"
      ? typedProducts
      : typedProducts.filter(
          (product) => product.category.toLowerCase() === category
        );
  console.log(category);
  return (
    <div>
      <SecondaryBanner
        title={" Explore Our Categories"}
        subtitle={
          " Find the perfect product by browsing through our curated collections."
        }
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Categories" }]}
      />

      <div className="flex">
        <div className="w-1/5  p-4">
          {" "}
          <SideNav />
        </div>
        <div className="w-4/5 bg-white p-4">
          <h2 className="text-xl font-semibold mb-4">
            Showing Results for {category.replace("-", " ").toUpperCase()}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
            {filteredProducts.map((product) => (
              <div key={product.id} className=" p-4 border rounded ">
                <Link
                  href={`/products/${product.id}`}
                  className="cursor-pointer hover:underline"
                >
                  <div>
                    {product.name} - Rs. {product.price}
                  </div>
                </Link>

                <AddToCart productId={product.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
