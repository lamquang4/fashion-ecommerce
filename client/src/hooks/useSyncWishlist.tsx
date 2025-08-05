import axios from "axios";

export function useSyncWishlist() {
  const syncWishlist = async () => {
    try {
      await axios.post("/api/sync-wishlist");
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { syncWishlist };
}
