"use client";
import { Coupon } from "@/types/type";
import axios from "axios";
import useSWR from "swr";
import { useCallback, useState } from "react";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCouponLazy() {
  const [url, setUrl] = useState<string | null>(null);

  const { data, error, isLoading, mutate } = useSWR<Coupon>(url, fetcher);

  const getCoupon = useCallback((code: string, totalPrice: number) => {
    if (!code || !totalPrice) return;
    const encoded = encodeURIComponent(code.trim());
    setUrl(`/api/get-coupon/${encoded}/${totalPrice}`);
  }, []);

  return {
    coupon: data,
    error,
    isLoading,
    getCoupon,
    mutate,
  };
}
