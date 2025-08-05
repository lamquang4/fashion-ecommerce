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
      await axios.put("/api/remove-item-cart", data);
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { removeItem, isLoading };
}
