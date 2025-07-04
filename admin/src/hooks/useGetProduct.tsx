"use client";
import { Product1 } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetProduct(id: string) {
  const url = `/api/get-product/${id}`;
  const { data, error, isLoading, mutate } = useSWR<Product1>(url, fetcher);

  return {
    product: data,
    isLoading,
    error,
    mutate,
  };
}
