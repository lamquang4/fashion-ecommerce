"use client";
import axios from "axios";
import { useState } from "react";

export default function useAddWishlist() {
  const [isLoading, setIsLoading] = useState(false);
  const addWishlist = async (data: { variant: string }) => {
    setIsLoading(true);
    try {
      await axios.post("/api/add-wishlist", data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addWishlist, isLoading };
}
