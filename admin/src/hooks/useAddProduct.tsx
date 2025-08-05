"use client";
import axios from "axios";
import { useState } from "react";

export default function useAddProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const addProduct = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await axios.post("/api/add-product", formData, {
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

  return { addProduct, isLoading };
}
