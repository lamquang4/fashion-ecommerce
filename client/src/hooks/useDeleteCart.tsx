"use client";
import axios from "axios";
import { useState } from "react";

export default function useDeleteCart() {
  const [isLoading, setIsLoading] = useState(false);
  const deleteCart = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/delete-cart`);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteCart, isLoading };
}
