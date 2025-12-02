"use client";
import { OrderFull } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

interface ResponseType {
  order: OrderFull;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetOrder(id: string) {
  const url = id ? `/api/orders/${id}` : null;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  return {
    order: data?.order,
    isLoading,
    error,
    mutate,
  };
}
