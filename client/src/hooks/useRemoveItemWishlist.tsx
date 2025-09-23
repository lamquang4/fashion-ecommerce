import axios from "axios";
import { useState } from "react";

export function useRemoveItemWishlist() {
  const [isLoading, setIsLoading] = useState(false);
  const removeItem = async (data: { wishlistId: string; variant: string }) => {
    setIsLoading(true);
    try {
      const url = `/api/wishlist`;
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
