import { fetchProducts } from "./api";
import { Product as ProductType } from "../types/product";
import { RawProduct } from "../types/rawProduct";

export const getTransformedProducts = async (): Promise<ProductType[]> => {
  const products: RawProduct[] = await fetchProducts();
  const baseURL =
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

  return products.map((product) => {
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
        images?.data?.map((img: unknown) => {
          const image = img as { attributes: { url: string } };
          return `${baseURL}${image.attributes.url}`;
        }) || [],
    };
  });
};
