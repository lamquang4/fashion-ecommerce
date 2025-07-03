"use client";
import axios from "axios";

export interface Coupon {
  _id?: string;
  code: string;
  discountValue: number;
  discountType: number;
  amount: number;
  limit: number;
  startDate: Date;
  expiryDate: Date;
  maxDiscountValue?: number;
  minOrderValue: number;
  status?: number;
}

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
