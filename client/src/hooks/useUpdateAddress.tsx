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
      await axios.put(`/api/update-address/${id}`, data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateAddress, isLoading };
}
