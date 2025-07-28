import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const fetchProducts = async () => {
  try {
    const res = await axios.get(`${API_URL}/products?populate=*`);
    return res.data.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};
export const fetchProductById = async (id: string | number) => {
  const res = await axios.get(`${API_URL}/products/${id}?populate=*`);
  return res.data.data;
};

//Categories

export const fetchCategories = async () => {
  const res = await axios.get(`${API_URL}/categories?populate=*`);

  return res.data.data;
};

// Order

export const createOrder = async (orderData: any) => {
  try {
    const res = await axios.post(`${API_URL}/orders`, {
      data: orderData,
    });
    return res.data;
  } catch (err) {
    console.error("Order submission failed", err);
    throw err;
  }
};
