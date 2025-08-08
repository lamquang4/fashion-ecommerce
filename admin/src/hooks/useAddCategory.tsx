"use client";
import axios from "axios";
import { useState } from "react";

export default function useAddCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const addCategory = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const url = `/api/add-category`;
      await axios.post(url, formData, {
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

  return { addCategory, isLoading };
}
