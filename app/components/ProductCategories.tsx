import Image from "next/image";
import Link from "next/link";
import categories from "../data/categories.json";
import { Category } from "../types/category";

export default function ProductCategories() {
  const typedCategory: Category[] = categories;
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
