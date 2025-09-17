"use client";
import { Wishlist } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetWishlist() {
  const url = `/api/get-wishlist`;
  const { data, error, isLoading, mutate } = useSWR<Wishlist>(url, fetcher, {
    shouldRetryOnError: false,
  });

  return {
    wishlist: data,
    error,
    isLoading,
    mutate,
  };
}
