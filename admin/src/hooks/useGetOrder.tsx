"use client";
import { OrderFull } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

interface ResponseType {
  order: OrderFull;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetOrder(id: string) {
  const url = `/api/get-order/${id}`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);

  return {
    order: data?.order,
    isLoading,
    error,
    mutate,
  };
}
