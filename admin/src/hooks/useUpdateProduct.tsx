"use client";
import axios from "axios";

export default function useUpdateProduct(id: string) {

  const updateProduct = async (formData: FormData) => {
    try {
      const res = await axios.put(`/api/update-product/${id}`, formData, {
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

  return { updateProduct };
}
