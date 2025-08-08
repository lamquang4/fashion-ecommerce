"use client";
import { Product } from "@/types/types";
import axios from "axios";
import useSWR from "swr";
interface ResponseType {
  product: Product;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetProduct(id: string) {
  const url = `/api/get-product/${id}`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);

  return {
    product: data?.product,
    isLoading,
    error,
    mutate,
  };
}
