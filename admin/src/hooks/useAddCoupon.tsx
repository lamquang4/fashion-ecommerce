"use client";
import { Coupon } from "@/types/types";
import axios from "axios";

export default function useAddCoupon() {
  const addCoupon = async (data: Coupon) => {
    try {
      const res = await axios.post("/api/add-coupon", data);
      return res.data.coupon;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { addCoupon };
}
