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

type ResponseType = {
  coupons: Coupon[];
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCoupons() {
  const url = `/api/get-coupons`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);

  return {
    coupons: data?.coupons ?? [],
    error,
    isLoading,
    mutate,
  };
}
