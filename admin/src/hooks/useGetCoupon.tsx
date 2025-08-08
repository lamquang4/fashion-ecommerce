"use client";
import { Coupon } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

interface ResponseType {
  coupon: Coupon;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCoupon(id: string) {
  const url = `/api/get-coupon/${id}`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);

  return {
    coupon: data?.coupon,
    isLoading,
    error,
    mutate,
  };
}
