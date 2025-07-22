"use client";
import { OrderAdd } from "@/types/type";
import axios from "axios";

export default function useAddOrder() {
  const addOrder = async (data: OrderAdd) => {
    try {
      const res = await axios.post("/api/add-order", data);
      return res.data.order;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { addOrder };
}
