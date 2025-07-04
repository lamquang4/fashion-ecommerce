"use client";
import { Coupon } from "@/types/types";
import axios from "axios";

export default function useUpdateCoupon(id: string) {
  const updateCoupon = async (data: Coupon) => {
    if (!id) return;
    try {
      const res = await axios.put(`/api/update-coupon/${id}`, data);
      return res.data.coupon;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { updateCoupon };
}
