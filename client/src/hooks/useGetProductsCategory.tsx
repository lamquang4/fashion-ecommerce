"use client";
import useSWR from "swr";
import axios from "axios";
import { Product } from "@/types/type";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

type ResponseType = {
  productsCateogry: Product[];
};

export default function useGetProductsCategory(
  category: string,
  product: string
) {
  const url = `/api/get-products1/${category}/${product}`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  return {
    productsCateogry: data?.productsCateogry ?? [],
    isLoading,
    error,
    mutate,
  };
}
