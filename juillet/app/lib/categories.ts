import axios from "axios";
import { Category as CategoryType } from "../types/category";
import { fetchCategories } from "./api";
const API_URL = "http://localhost:1337/api";

export const fetchTransformedCategories = async (): Promise<CategoryType[]> => {
  try {
    const categories = await fetchCategories();

    return categories.map((cat: any) => ({
      slug: cat.attributes.slug,
      label: cat.attributes.name,
      image: cat.attributes.image?.data?.attributes?.url
        ? `http://localhost:1337${cat.attributes.image.data.attributes.url}`
        : "",
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
