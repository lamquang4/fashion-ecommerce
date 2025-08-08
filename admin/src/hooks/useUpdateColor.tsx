"use client";
import { Color } from "@/types/types";
import axios from "axios";
import { useState } from "react";

export default function useUpdateColor(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const updateColor = async (data: Color) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const url = `/api/update-color/${id}`;
      await axios.put(url, data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateColor, isLoading };
}
