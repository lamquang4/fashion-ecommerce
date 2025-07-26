"use client";
import { OrderFull } from "@/types/type";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

type ResponseType = {
  orders: OrderFull[];
};

const fetcher = (url: string): Promise<ResponseType> =>
  axios.get(url).then((res) => res.data);

export default function useGetOrders() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const query = new URLSearchParams();

  if (status) {
    query.set("status", status);
  }

  const url = `/api/get-orders?${query.toString()}`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);

  return {
    orders: data?.orders ?? [],
    error,
    isLoading,
    mutate,
  };
}
