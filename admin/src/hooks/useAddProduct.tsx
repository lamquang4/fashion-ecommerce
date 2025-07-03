"use client";
import axios from "axios";

export default function useAddProduct() {

  const addProduct = async (formData: FormData) => {
    try {
      const res = await axios.post("/api/add-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.product;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } 
  };

  return { addProduct };
}
