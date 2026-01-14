"use client";
import { Product } from "@/types/types";
import axios from "axios";
import useSWR from "swr";
interface ResponseType {
  product: Product;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetProduct(id: string) {
  const url = id ? `/api/products/${id}` : null;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  return {
    product: data?.product,
    isLoading,
    error,
    mutate,
  };
}
