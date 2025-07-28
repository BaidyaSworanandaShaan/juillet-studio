import { Category as CategoryType } from "../types/category";
import { fetchCategories } from "./api";
const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

export const fetchTransformedCategories = async (): Promise<
  { slug: string; label: string; image: string }[]
> => {
  try {
    const categories: CategoryType[] = await fetchCategories();

    return categories.map((cat) => ({
      slug: cat.attributes.slug,
      label: cat.attributes.name,
      image: cat.attributes.image?.data?.attributes?.url
        ? `${API_URL}${cat.attributes.image.data.attributes.url}`
        : "",
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
