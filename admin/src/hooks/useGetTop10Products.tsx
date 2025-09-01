"use client";
import { Product } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

interface ResponseType {
  topProducts: Product[];
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetTop10Products() {
  const url = `/api/get-top10products`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );
  return {
    topProducts: data?.topProducts ?? [],
    isLoading,
    error,
    mutate,
  };
}
