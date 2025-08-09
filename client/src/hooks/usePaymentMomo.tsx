"use client";
import axios from "axios";

export default function usePaymentMomo() {
  const createPaymentMomo = async (data: {
    total: number;
    paymethod: number;
  }) => {
    try {
      const url = `/api/momo/payment`;
      const res = await axios.post(url, data);
      return res.data;
    } catch (err) {
      console.error("Lỗi", err);
      throw err;
    }
  };

  return { createPaymentMomo };
}
