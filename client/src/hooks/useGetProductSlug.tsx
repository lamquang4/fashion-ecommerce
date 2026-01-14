"use client";
import { Product } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetProductSlug(slug: string) {
  const url = slug ? `/api/products/${slug}` : null;
  const { data, error, isLoading, mutate } = useSWR<Product>(url, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  return {
    product: data,
    isLoading,
    error,
    mutate,
  };
}
