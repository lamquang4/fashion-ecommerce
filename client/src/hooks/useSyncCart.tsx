"use client";
import axios from "axios";
import { useState } from "react";

export function useSyncCart() {
  const [isLoading, setIsLoading] = useState(false);
  const syncCart = async () => {
    setIsLoading(true);
    try {
      const url = `/api/sync-cart`;
      await axios.post(url);
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { syncCart, isLoading };
}
