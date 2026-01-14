"use client";
import { OrderFull } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCategory(code: string) {
  const url = code ? `/api/orders/${code}` : null;
  const { data, error, isLoading, mutate } = useSWR<OrderFull>(url, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  return {
    order: data,
    error,
    isLoading,
    mutate,
  };
}
