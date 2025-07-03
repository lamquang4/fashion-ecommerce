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

export default function useUpdateCoupon(id: string) {
  const updateCoupon = async (data: Coupon) => {
    if (!id) throw new Error("ID không hợp lệ");
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
