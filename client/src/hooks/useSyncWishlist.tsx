import axios from "axios";

export function useSyncWishlist() {
  const syncWishlist = async () => {
    try {
      const url = `/api/get-promotebanners`;
      await axios.post(url);
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { syncWishlist };
}
