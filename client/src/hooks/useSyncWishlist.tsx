"use client";
import axios from "axios";
import { useState } from "react";

export function useSyncWishlist() {
  const [isLoading, setIsLoading] = useState(false);
  const syncWishlist = async () => {
    setIsLoading(true);
    try {
      const url = `/api/get-promotebanners`;
      await axios.post(url);
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { syncWishlist, isLoading };
}
