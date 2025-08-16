"use client";
import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Order } from "@/types/types";

interface ResponseType {
  orders: Order[];
  totalPages: number;
  total: number;
  totalRevenue: number;
  totalSold: number;
  totalStatus0: number;
  totalStatus3: number;
  totalStatus4: number;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetOrders() {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const start = searchParams.get("start") || "";
  const end = searchParams.get("end") || "";
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    start,
    end,
    keyword,
    status,
  });
  const url = `/api/get-orders?${query.toString()}`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);
  return {
    orders: data?.orders ?? [],
    totalPages: data?.totalPages || 1,
    totalItems: data?.total || 0,
    totalRevenue: data?.totalRevenue || 0,
    totalSold: data?.totalSold || 0,
    totalStatus0: data?.totalStatus0 || 0,
    totalStatus3: data?.totalStatus3 || 0,
    totalStatus4: data?.totalStatus4 || 0,
    currentPage: page,
    limit,
    setKeyword,
    setStatus,
    isLoading,
    error,
    mutate,
  };
}
