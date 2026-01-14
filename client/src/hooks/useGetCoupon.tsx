"use client";
import { Coupon } from "@/types/type";
import axios from "axios";
import useSWR from "swr";
import { useCallback, useState } from "react";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCoupon() {
  const [url, setUrl] = useState<string | null>(null);

  const { data, error, isLoading, mutate } = useSWR<Coupon>(url, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  const getCoupon = useCallback((code: string, totalPrice: number) => {
    if (!code || !totalPrice) return;

    setUrl(`/api/coupons/${code}/${totalPrice}`);
  }, []);

  return {
    coupon: data,
    error,
    isLoading,
    getCoupon,
    mutate,
  };
}
