"use client";
import { OrderFull } from "@/types/type";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

type ResponseType = {
  orders: OrderFull[];
  totalPages: number;
  total: number;
};

const fetcher = (url: string): Promise<ResponseType> =>
  axios.get(url).then((res) => res.data);

export default function useGetOrders() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const status = parseInt(searchParams.get("status") || "");
  const limit = 12;
  const query = new URLSearchParams();

  if (status) {
    query.set("status", status.toString());
  }

  if (page) {
    query.set("page", page.toString());
  }

  if (limit) {
    query.set("limit", limit.toString());
  }

  const url = `/api/get-orders?${query.toString()}`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);

  return {
    orders: data?.orders ?? [],
    totalItems: data?.total || 0,
    error,
    isLoading,
    mutate,
    limit,
    totalPages: data?.totalPages || 1,
    currentPage: page,
  };
}
