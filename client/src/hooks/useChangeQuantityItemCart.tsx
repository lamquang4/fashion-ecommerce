"use client";
import axios from "axios";
import { useState } from "react";

export function useChangeQuantityItemCart() {
  const [isLoading, setIsLoading] = useState(false);
  const changeQuantity = async (data: {
    cartId: string;
    variant: string;
    size: string;
    quantity: number;
  }) => {
    setIsLoading(true);
    try {
      await axios.post("/api/change-quantity-item-cart", data);
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { changeQuantity, isLoading };
}
