import axios from "axios";

export function useSyncCart() {
  const syncCart = async () => {
    try {
      const url = `/api/sync-cart`;
      await axios.post(url);
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { syncCart };
}
