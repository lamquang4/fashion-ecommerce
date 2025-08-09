"use client";
import { Product } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

type ResponseType = {
  productsMale: Product[];
  productsFemale: Product[];
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetProductsGender() {
  const url = `/api/get-products-gender`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);

  return {
    productsMale: data?.productsMale || [],
    productsFemale: data?.productsFemale || [],
    error,
    isLoading,
    mutate,
  };
}
