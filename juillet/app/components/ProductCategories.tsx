import Image from "next/image";
import Link from "next/link";

import { fetchTransformedCategories } from "../lib/categories";
import { CategoryResponse } from "../(cartbtn)/categories/[category]/page";
import { fetchCategories } from "../lib/api";
export const revalidate = 60;
export async function generateStaticParams() {
  const transformedCategories: CategoryResponse[] = await fetchCategories();

  return transformedCategories.map((cat) => ({
    category: cat.attributes.slug,
  }));
}
export default async function ProductCategories() {
  const typedCategory = await fetchTransformedCategories();
  console.log(typedCategory);
  return (
    <div className="flex items-center justify-center flex-col  w-full pb-40">
      <h2 className="section-title mb-2">Product Categories</h2>
      <p className="section-title--sub text-center">
        Browse our handcrafted collections, made with care and creativity.
      </p>
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {typedCategory.map((category) => {
            const slug = category.slug.toLowerCase().replace(/\s+/g, "-");
            return (
              <Link
                href={`/categories/${slug}`}
                passHref
                key={category.slug}
                className="bg-white shadow-sm hover:shadow-md transition overflow-hidden block"
              >
                <div className="p-3 text-center cursor-pointer">
                  {category.image && (
                    <div className="relative w-14 h-14 mx-auto mb-3">
                      <Image
                        alt={category.label}
                        src={category.image}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}
                  <span className="font-bold text-text">{category.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
