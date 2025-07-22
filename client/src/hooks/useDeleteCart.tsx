"use client";
import axios from "axios";

export default function useDeleteCart() {
  const deleteCart = async (id: string) => {
    if (!id) return;

    try {
      await axios.delete(`/api/delete-cart/${id}`);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { deleteCart };
}
