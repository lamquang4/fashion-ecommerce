"use client";
import { useEffect, useState } from "react";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import { useSearchParams } from "next/navigation";
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

interface ResponseType {
  coupons: Coupon[];
  totalPages: number;
  total: number;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCoupons() {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    keyword,
    status,
  });
  const url = `/api/get-coupons?${query.toString()}`;

  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);
  return {
    coupons: data?.coupons || [],
    totalPages: data?.totalPages || 1,
    totalItems: data?.total || 0,
    currentPage: page,
    limit,
    setKeyword,
    setStatus,
    isLoading,
    error,
    mutate,
  };
}
