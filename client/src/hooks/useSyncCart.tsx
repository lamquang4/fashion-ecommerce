import axios from "axios";

export function useSyncCart() {
  const syncCart = async () => {
    try {
      const response = await axios.post("/api/sync-cart");

      return response.data;
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { syncCart };
}
