import Link from "next/link";

import { fetchTransformedCategories } from "../lib/categories";

type Props = {
  currentPath: string;
};
const SideNav = async ({ currentPath }: Props) => {
  const categories = await fetchTransformedCategories();

  const isActive = (path: string) => currentPath === path;
  return (
    <nav className="flex flex-col gap-3">
      <Link
        href="/categories/all"
        className={`block px-4 py-2 rounded ${
          isActive("/categories/all")
            ? "bg-black text-white"
            : "hover:bg-gray-200"
        }`}
      >
        All Products
      </Link>
      {categories.map(({ slug, label }) => {
        const href = `/categories/${slug}`;
        return (
          <Link
            key={slug}
            href={href}
            className={`block px-4 py-2 rounded hover:bg-gray-200 ${
              isActive(href) ? "bg-black text-white" : "hover:bg-gray-200"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
};

export default SideNav;
