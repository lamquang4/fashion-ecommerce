"use client";
import { Coupon } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

interface ResponseType {
  coupon: Coupon;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCoupon(id: string) {
  const url = id ? `/api/coupons/${id}` : null;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  return {
    coupon: data?.coupon,
    isLoading,
    error,
    mutate,
  };
}
