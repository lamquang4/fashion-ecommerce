import axios from "axios";

export function useSyncCart() {
  const syncCart = async () => {
    try {
      await axios.post("/api/sync-cart");
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { syncCart };
}
