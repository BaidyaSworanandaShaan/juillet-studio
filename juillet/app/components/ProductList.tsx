import React from "react";

import Link from "next/link";
import { getTransformedProducts } from "../lib/product";
import Image from "next/image";
export const revalidate = 60;
const ProductList = async () => {
  const typedProducts = await getTransformedProducts();
  return (
    <div>
      <div className="flex items-center justify-center flex-col  w-full pb-40">
        <h2 className="section-title mb-2">Featured Products</h2>
        <p className="section-title--sub text-center">
          Browse our handcrafted collections, made with care and creativity.
        </p>
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {typedProducts.slice(0, 8).map((p) => (
              <Link href={`/products/${p.id}`} key={p.id} passHref>
                <div className="bg-white  hover:shadow-md transition rounded-xl overflow-hidden cursor-pointer p-4 ">
                  {/* PRODUCT IMAGE */}
                  {p.images && (
                    <div className="relative w-48 h-48 mx-auto mt-5 rounded-lg overflow-hidden">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}

                  {/* PRODUCT INFO */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-600">Rs. {p.price}</p>
                  </div>
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
