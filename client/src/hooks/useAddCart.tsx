"use client";
import axios from "axios";
import { useState } from "react";

export default function useAddCart() {
  const [isLoading, setIsLoading] = useState(false);
  const addCart = async (data: {
    variant: string;
    size: string;
    quantity: number;
  }) => {
    setIsLoading(true);
    try {
      await axios.post("/api/add-cart", data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addCart, isLoading };
}
