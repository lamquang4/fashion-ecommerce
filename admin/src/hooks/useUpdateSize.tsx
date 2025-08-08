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
      const url = `/api/update-size/${id}`;
      await axios.put(url, data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateSize, isLoading };
}
