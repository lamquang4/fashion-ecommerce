"use client";
import { Size } from "@/types/types";
import axios from "axios";
import { useState } from "react";

export default function useUpdateSize(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const updateSize = async (data: Size) => {
    if (!id) return;
    setIsLoading(true);
    try {
      await axios.put(`/api/update-size/${id}`, data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateSize, isLoading };
}
