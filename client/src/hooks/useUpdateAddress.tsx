"use client";
import { Address } from "@/types/type";
import axios from "axios";

export default function useUpdateAddress(id: string) {
  const updateAddress = async (data: Address) => {
    if (!id) return;
    try {
      const res = await axios.put(`/api/update-address/${id}`, data);
      return res.data.address;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { updateAddress };
}
