"use client";
import axios from "axios";
import { useState } from "react";

export default function useAddBanner() {
  const [isLoading, setIsLoading] = useState(false);
  const addBanner = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await axios.post("/api/add-banner", formData, {
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

  return { addBanner, isLoading };
}
