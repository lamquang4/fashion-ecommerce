"use client";
import axios from "axios";

export default function usePaymentMomo() {
  const createPaymentMomo = async (data: {
    total: number;
    paymethod: number;
  }) => {
    try {
      const res = await axios.post("/api/momo/payment", data);
      return res.data;
    } catch (err) {
      console.error("Lỗi", err);
      throw err;
    }
  };

  return { createPaymentMomo };
}
