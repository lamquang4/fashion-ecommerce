"use client";
import axios from "axios";
import useSWR from "swr";

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

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCoupon(id: string) {
  const url = `/api/get-coupon/${id}`;
  const { data, error, isLoading, mutate } = useSWR<Coupon>(url, fetcher);

  return {
    coupon: data,
    isLoading,
    error,
    mutate,
  };
}
