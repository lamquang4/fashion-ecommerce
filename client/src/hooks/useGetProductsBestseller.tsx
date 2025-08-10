"use client";
import useSWR from "swr";
import axios from "axios";
import { Product } from "@/types/type";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

type ResponseType = {
  productsBestseller: Product[];
};

export default function useGetProductsBestseller() {
  const url = `/api/get-products-bestseller`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);

  return {
    productsBestseller: data?.productsBestseller,
    isLoading,
    error,
    mutate,
  };
}
