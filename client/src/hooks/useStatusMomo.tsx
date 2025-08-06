"use client";
import axios from "axios";
import { useState } from "react";

export default function useStatusMomo() {
  const [isLoading, setIsLoading] = useState(false);
  const checkPaymentStatusMomo = async (orderId: string) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`/api/momo/notify/${orderId}`);
      return res.data;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { checkPaymentStatusMomo, isLoading };
}
