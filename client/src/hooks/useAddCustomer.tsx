"use client";
import { User } from "@/types/type";
import axios from "axios";

export default function useAddCustomer() {
  const addCustomer = async (data: User) => {
    try {
      const res = await axios.post("/api/add-customer", data);
      return res.data.user;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { addCustomer };
}
