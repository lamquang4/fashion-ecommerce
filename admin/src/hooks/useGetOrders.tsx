"use client";
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
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const q = searchParams.get("q");
  const status = searchParams.get("status");
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const query = new URLSearchParams();
  if (page) query.set("page", page.toString());
  if (limit) query.set("limit", limit.toString());
  if (q) query.set("q", q);
  if (status) query.set("status", status.toString());
  if (start) query.set("start", start.toString());
  if (end) query.set("end", end.toString());

  const url = `/api/orders?${query.toString()}`;

  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );
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
    isLoading,
    error,
    mutate,
  };
}
