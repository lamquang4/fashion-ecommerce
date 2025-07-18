import axios from "axios";

export function useSyncWishlist() {
  const syncWishlist = async () => {
    try {
      const response = await axios.post("/api/sync-wishlist");

      return response.data;
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { syncWishlist };
}
