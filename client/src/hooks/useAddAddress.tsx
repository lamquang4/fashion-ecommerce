"use client";
import { Address } from "@/types/type";
import axios from "axios";

export default function useAddAddress() {
  const addAddress = async (data: Address) => {
    try {
      const res = await axios.post("/api/add-address", data);
      return res.data.address;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { addAddress };
}
