"use client";
import axios from "axios";

export default function useDeleteCart() {
  const deleteCart = async () => {
    try {
      await axios.delete(`/api/delete-cart`);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { deleteCart };
}
