"use client";
import axios from "axios";

export default function useAddWishlist() {
  const addWishlist = async (data: {
    variant: string;
  }) => {
    try {
      const res = await axios.post("/api/add-wishlist", data);
      return res.data;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { addWishlist };
}
