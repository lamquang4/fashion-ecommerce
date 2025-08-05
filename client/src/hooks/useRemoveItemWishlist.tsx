import axios from "axios";
import { useState } from "react";

export function useRemoveItemWishlist() {
  const [isLoading, setIsLoading] = useState(false);
  const removeItem = async (data: { wishlistId: string; variant: string }) => {
    setIsLoading(true);
    try {
      await axios.put("/api/remove-item-wishlist", data);
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { removeItem, isLoading };
}
