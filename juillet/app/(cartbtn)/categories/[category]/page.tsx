import SecondaryBanner from "../../../components/SecondaryBanner";
import React from "react";
import SideNav from "../../../components/SideNav";
import Link from "next/link";
import AddToCart from "../../../components/AddToCart";
import { fetchCategories } from "@/app/lib/api";
import { getTransformedProducts } from "@/app/lib/product";
import { Availability } from "@/app/types/availability";
import Image from "next/image";
import { Product } from "@/app/types/product";

export const revalidate = 60;

export type CategoryResponse = {
  id: number;
  attributes: {
    name: string;
    slug: string;
  };
};
// type PageProps = {
//   params: {
//     category: string;
//   };
// };

export async function generateStaticParams() {
  const transformedCategories: CategoryResponse[] = await fetchCategories();

  return transformedCategories.map((cat) => ({
    category: cat.attributes.slug,
  }));
}

const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const resolvedParams = await params;
  const currentPath = `/categories/${resolvedParams.category}`;
  const category = resolvedParams.category;
  const transformedProducts: Product[] = await getTransformedProducts();

  const filteredProducts =
    category === "all"
      ? transformedProducts
      : transformedProducts.filter(
          (product) =>
            product.category.toLowerCase().replace(" ", "-") === category
        );

  return (
    <div>
      <SecondaryBanner
        title={"Explore Our Categories"}
        subtitle={
          "Find the perfect product by browsing through our curated collections."
        }
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Categories" }]}
      />

      <div className="flex flex-col md:flex-row gap-6 px-4 md:px-8 lg:px-16 py-6">
        <div className="w-full md:w-1/4 bg-white p-4 rounded-md shadow-sm">
          <SideNav currentPath={currentPath} />
        </div>

        <div className="w-full md:w-3/4 bg-white p-4 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold mb-6">
            Showing Results for {category.replace("-", " ").toUpperCase()}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const firstImage = product.images?.[0];

                return (
                  <div
                    key={product.id}
                    className="p-4 border rounded-xl shadow-sm hover:shadow-md transition duration-200 bg-white flex flex-col"
                  >
                    <Link
                      href={`/products/${product.id}`}
                      className="cursor-pointer group"
                    >
                      <div>
                        <div className="relative w-full pb-[100%] rounded-lg overflow-hidden">
                          <Image
                            src={firstImage}
                            alt={product.name}
                            fill
                            className="transition-transform duration-300 group-hover:scale-105 object-cover"
                          />
                        </div>
                        <div className="mt-4 text-center">
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Rs. {product.price}
                          </p>
                        </div>
                      </div>
                    </Link>

                    <div className="text-center mt-auto">
                      {product.availability.toLowerCase() ===
                      Availability.InStock ? (
                        <AddToCart product={product} />
                      ) : (
                        <p className="text-md text-red-600 font-bold mt-4">
                          Out of Stock
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-gray-500 text-center col-span-full">
                <p className="text-lg">Sorry, No products found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
