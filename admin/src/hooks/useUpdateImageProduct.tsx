"use client";
import axios from "axios";
import { useState } from "react";

export default function useUpdateImageProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const updateImageProduct = async (formData: FormData, id: string) => {
    if (!id || !formData) return;
    setIsLoading(true);
    try {
      const url = `/api/products/images/${id}`;
      await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateImageProduct, isLoading };
}
