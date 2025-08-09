"use client";
import axios from "axios";
import { useState } from "react";

export default function useDeleteAddress() {
  const [isLoading, setIsLoading] = useState(false);
  const deleteAddress = async (id: string) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const url = `/api/delete-address/${id}`;
      await axios.delete(url);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteAddress, isLoading };
}
