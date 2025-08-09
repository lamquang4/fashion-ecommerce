"use client";
import { useState } from "react";
import { OrderAdd } from "@/types/type";
import axios from "axios";

export default function useAddOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const addOrder = async (data: OrderAdd) => {
    setIsLoading(true);
    try {
      const url = `/api/add-order`;
      await axios.post(url, data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addOrder, isLoading };
}
