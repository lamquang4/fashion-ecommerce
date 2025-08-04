"use client";
import axios from "axios";

export default function useStatusMomo() {
  const checkPaymentStatusMomo = async (orderId: string) => {
    try {
      const res = await axios.post(`/api/momo/notify/${orderId}`);
      return res.data;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { checkPaymentStatusMomo };
}
