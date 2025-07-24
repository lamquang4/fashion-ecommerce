"use client";
import { OrderFull } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

type ResponseType = {
  orders: OrderFull[];
};

const fetcher = (url: string): Promise<ResponseType> =>
  axios.get(url).then((res) => res.data);

export default function useGetOrders() {
  const url = `/api/get-orders`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);

  return {
    orders: data?.orders ?? [],
    error,
    isLoading,
    mutate,
  };
}
