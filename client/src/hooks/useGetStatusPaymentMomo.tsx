"use client";
import axios from "axios";
import { useState } from "react";

export default function useGetStatusPaymentMomo() {
  const [isLoading, setIsLoading] = useState(false);
  const getStatusPaymentMomo = async (orderId: string) => {
    setIsLoading(true);
    try {
      const url = `/api/momo/notification/${orderId}`;
      const res = await axios.post(url);
      return res.data;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { getStatusPaymentMomo, isLoading };
}
