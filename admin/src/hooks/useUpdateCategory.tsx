"use client";
import axios from "axios";
import { useState } from "react";

export default function useUpdateCategory(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const updateCategory = async (formData: FormData) => {
    if (!id) return;
    setIsLoading(true);
    try {
      await axios.put(`/api/update-category/${id}`, formData, {
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

  return { updateCategory, isLoading };
}
