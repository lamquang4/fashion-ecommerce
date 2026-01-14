"use client";
import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { Product } from "@/types/type";

interface ResponseType {
  products: Product[];
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetProductsSuggestion() {
  const [keyword, setKeyword] = useState("");

  const query = new URLSearchParams();

  if (keyword) query.set("keyword", keyword);

  const url = `/api/products/suggestion?${query.toString()}`;

  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );
  return {
    products: data?.products ?? [],
    setKeyword,
    isLoading,
    error,
    mutate,
  };
}
