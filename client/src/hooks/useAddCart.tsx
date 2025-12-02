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
    if (!data.variant || !data.size || !data.quantity) {
      return;
    }
    setIsLoading(true);
    try {
      const url = `/api/cart`;
      await axios.post(url, data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addCart, isLoading };
}
