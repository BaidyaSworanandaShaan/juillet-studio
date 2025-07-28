import { fetchProducts } from "./api"; // your existing api fetch function
import { Product as ProductType } from "../types/product";

export const getTransformedProducts = async (): Promise<ProductType[]> => {
  const products = await fetchProducts();
  const baseURL =
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  return products.map((product: any) => {
    const { name, price, description, availability, category, images } =
      product.attributes;
    return {
      id: product.id,
      name,
      price,
      description,
      availability,
      category: category?.data?.attributes?.name || "",
      images:
        images?.data?.map((img) => `${baseURL}${img.attributes.url}`) || [],
    };
  });
};
