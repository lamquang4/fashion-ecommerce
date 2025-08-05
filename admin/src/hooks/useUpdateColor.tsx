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
      await axios.put(`/api/update-color/${id}`, data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateColor, isLoading };
}
