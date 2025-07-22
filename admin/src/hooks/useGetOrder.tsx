"use client";
import { OrderFull } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetOrder(id: string) {
  const url = `/api/get-order/${id}`;
  const { data, error, isLoading, mutate } = useSWR<OrderFull>(url, fetcher);

  return {
    order: data,
    isLoading,
    error,
    mutate,
  };
}
