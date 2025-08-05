"use client";
import axios from "axios";
import { useState } from "react";

export default function useDeleteAddress() {
  const [isLoading, setIsLoading] = useState(false);
  const deleteAddress = async (id: string) => {
    if (!id) return;
    setIsLoading(true);
    try {
      await axios.delete(`/api/delete-address/${id}`);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteAddress, isLoading };
}
