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
    if (!data.cartId || !data.variant || !data.size || !data.quantity) {
      return;
    }
    setIsLoading(true);
    try {
      const url = `/api/cart/quantity`;
      await axios.post(url, data);
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { changeQuantity, isLoading };
}
