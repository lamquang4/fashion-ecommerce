"use client";
import axios from "axios";
import { useState } from "react";

export default function useUpdateImage() {
  const [isLoading, setIsLoading] = useState(false);
  const updateImage = async (formData: FormData, id: string) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const url = `/api/update-image/${id}`;
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

  return { updateImage, isLoading };
}
