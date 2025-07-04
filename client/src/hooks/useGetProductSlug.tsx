"use client";
import { Product } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data.product);

export default function useGetProductSlug(slug: string) {
  const url = `/api/get-product/${slug}`;
  const { data, error, isLoading, mutate } = useSWR<Product>(url, fetcher);

  return {
    product: data,
    isLoading,
    error,
    mutate,
  };
}
