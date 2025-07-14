"use client";
import { User } from "@/types/type";
import axios from "axios";

export default function useUpdateCustomer(id: string) {
  const updateCustomer = async (data: User) => {
    if (!id) return;
    try {
      const res = await axios.put(`/api/update-customer/${id}`, data);
      return res.data.customer;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { updateCustomer };
}
