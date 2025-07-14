"use client";
import axios from "axios";

export default function useDeleteAddress() {
  const deleteAddress = async (id: string) => {
    if (!id) return;

    try {
      await axios.delete(`/api/delete-address/${id}`);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { deleteAddress };
}
