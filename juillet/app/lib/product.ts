import { fetchProducts } from "./api"; // your existing api fetch function
import { Product as ProductType } from "../types/product";

export const getTransformedProducts = async (): Promise<ProductType[]> => {
  const products = await fetchProducts();

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
        images?.data?.map(
          (img: any) => `http://localhost:1337${img.attributes.url}`
        ) || [],
    };
  });
};
