"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export interface Coupon {
  _id: string;
  code: string;
  discountValue: number;
  discountType: number;
  amount: number;
  limit: number;
  startDate: string;
  expiryDate: string;
  maxDiscountValue?: number;
  minOrderValue: number;
  status: number;
}

export default function useGetCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const dispatch = useAppDispatch();

  const fetchCoupons = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get("/api/get-coupons");
      setCoupons(res.data);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return { coupons, fetchCoupons };
}
