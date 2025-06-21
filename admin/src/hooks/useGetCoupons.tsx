"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import { useSearchParams } from "next/navigation";

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
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const dispatch = useAppDispatch();

  const fetchCoupons = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(
        `/api/get-coupons?page=${page}&limit=${limit}`
      );
      setCoupons(res.data.coupons);
      setTotalPages(res.data.totalPages);
      setTotalItems(res.data.total);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, [page, limit]);

  return {
    coupons,
    fetchCoupons,
    totalPages,
    totalItems,
    currentPage: page,
    limit,
  };
}
