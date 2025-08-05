"use client";
import axios from "axios";
import { useState } from "react";

export default function useUpdateProduct(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const updateProduct = async (formData: FormData) => {
    if (!id) return;
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProduct, isLoading };
}
