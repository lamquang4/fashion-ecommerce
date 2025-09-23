"use client";
import { Cart } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCart() {
  const url = `/api/cart`;
  const { data, error, isLoading, mutate } = useSWR<Cart>(url, fetcher, {
    shouldRetryOnError: false,
  });

  return {
    cart: data,
    error,
    isLoading,
    mutate,
  };
}
