"use client";
import useSWR from "swr";
import axios from "axios";
import { Product } from "@/types/type";

const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data.products);

export default function useGetProductsCategory(
  category: string,
  product: string
) {
  const url = `/api/get-products1/${category}/${product}`;
  const { data, error, isLoading, mutate } = useSWR<Product[]>(url, fetcher);

  return {
    productsCateogry: data,
    isLoading,
    error,
    mutate,
  };
}
