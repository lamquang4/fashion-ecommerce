import axios from "axios";

export function useRemoveItemWishlist() {
  const removeItem = async (data: {
    wishlistId: string;
    variant: string;
  }) => {
    try {
      const response = await axios.put("/api/remove-item-wishlist", data);

      return response.data;
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { removeItem };
}
