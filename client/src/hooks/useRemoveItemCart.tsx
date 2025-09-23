import axios from "axios";
import { useState } from "react";

export function useRemoveItemCart() {
  const [isLoading, setIsLoading] = useState(false);
  const removeItem = async (data: {
    cartId: string;
    variant: string;
    size: string;
  }) => {
    setIsLoading(true);
    try {
      const url = `/api/cart`;
      await axios.put(url, data);
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { removeItem, isLoading };
}
