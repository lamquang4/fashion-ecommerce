"use client";
import { Product } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

interface ResponseType {
  top10Products: Product[];
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetTop10Products() {
  const url = `/api/get-top10products`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);
  return {
    top10Products: data?.top10Products ?? [],
    isLoading,
    error,
    mutate,
  };
}
