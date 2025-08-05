"use client";
import axios from "axios";
import { useState } from "react";

export default function useUpdateBanner() {
  const [isLoading, setIsLoading] = useState(false);
  const updateBanner = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await axios.put("/api/update-banner", formData, {
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

  return { updateBanner, isLoading };
}
