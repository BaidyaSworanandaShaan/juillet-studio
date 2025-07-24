import Link from "next/link";
import React from "react";

const categories = [
  { slug: "all", label: "All Products" },
  { slug: "ear-rings", label: "Ear Rings" },
  { slug: "rings", label: "Rings" },
  { slug: "bracelets", label: "Bracelets" },
  { slug: "necklaces", label: "Necklaces" },
  { slug: "crochet", label: "Crochet" },
];

const SideNav = () => {
  return (
    <nav className="flex flex-col gap-3">
      {categories.map(({ slug, label }) => (
        <Link
          key={slug}
          href={`/categories/${slug}`}
          className="block px-4 py-2 rounded hover:bg-gray-200"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default SideNav;
