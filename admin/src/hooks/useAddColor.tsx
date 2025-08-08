"use client";
import { Color } from "@/types/types";
import axios from "axios";
import { useState } from "react";

export default function useAddColor() {
  const [isLoading, setIsLoading] = useState(false);
  const addColor = async (data: Color) => {
    setIsLoading(true);
    try {
      const url = `/api/add-color`;
      await axios.post(url, data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addColor, isLoading };
}
