"use client";
import axios from "axios";
import { useState } from "react";

export default function usePaymentMomo() {
  const [isLoading, setIsLoading] = useState(false);
  const createPaymentMomo = async (data: {
    total: number;
    orderCode: string;
  }) => {
    if (!data.total || !data.orderCode) {
      return;
    }
    setIsLoading(true);
    try {
      const url = `/api/momo/payment`;
      const res = await axios.post(url, data);
      return res.data;
    } catch (err) {
      console.error("Lỗi", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createPaymentMomo, isLoading };
}
