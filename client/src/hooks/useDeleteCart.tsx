"use client";
import axios from "axios";
import { useState } from "react";

export default function useDeleteCart() {
  const [isLoading, setIsLoading] = useState(false);
  const deleteCart = async () => {
    setIsLoading(true);
    try {
      const url = `/api/delete-cart`;
      await axios.delete(url);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteCart, isLoading };
}
