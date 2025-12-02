"use client";
import axios from "axios";
import { useState } from "react";

export default function useAddWishlist() {
  const [isLoading, setIsLoading] = useState(false);
  const addWishlist = async (data: { variant: string }) => {
    if (!data.variant) {
      return;
    }
    setIsLoading(true);
    try {
      const url = `/api/wishlist`;
      await axios.post(url, data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addWishlist, isLoading };
}
