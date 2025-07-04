"use client";
import { Coupon } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

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
