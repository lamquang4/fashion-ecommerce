"use client";
import { Coupon } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

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
