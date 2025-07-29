import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const fetchProducts = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/products?populate=*`);
    return res.data.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};
export const fetchProductById = async (id: string | number) => {
  const res = await axios.get(`${API_URL}/api/products/${id}?populate=*`);
  return res.data.data;
};

//Categories

export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/api/categories?populate=*`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch categories");

  const data = await res.json();
  return data.data;
};

// Order
/* eslint-disable @typescript-eslint/no-explicit-any */
export const createOrder = async (orderData: any) => {
  try {
    const res = await axios.post(`${API_URL}/api/orders`, {
      data: orderData,
    });
    return res.data;
  } catch (err) {
    console.error("Order submission failed", err);
    throw err;
  }
};
