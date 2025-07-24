import React from "react";

import products from "../data/product.json";
import { Product } from "../types/product";
import Link from "next/link";

const typedProducts: Product[] = products;
const ProductList = () => {
  return (
    <div>
      <div className="flex items-center justify-center flex-col  w-full pb-40">
        <h2 className="section-title mb-2">Top Selling Products</h2>
        <p className="section-title--sub text-center">
          Browse our handcrafted collections, made with care and creativity.
        </p>
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-2 md:grid-cols-3  gap-6 text-center ">
            {typedProducts.map((p) => (
              <Link href={`/products/${p.id}`} key={p.id}>
                <div className="hover:underline cursor-pointer">
                  {p.name} - ${p.price}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
