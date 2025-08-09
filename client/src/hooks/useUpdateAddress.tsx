"use client";
import { Address } from "@/types/type";
import axios from "axios";
import { useState } from "react";

export default function useUpdateAddress(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const updateAddress = async (data: Address) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const url = `/api/update-address/${id}`;
      await axios.put(url, data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateAddress, isLoading };
}
