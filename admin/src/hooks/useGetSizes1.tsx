"use client";
import axios from "axios";
import useSWR from "swr";
import { Size } from "@/types/types";

interface ResponseType {
  sizes: Size[];
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetSizes1() {
  const url = `/api/get-sizes1`;

  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);
  return {
    sizes: data?.sizes ?? [],
    isLoading,
    error,
    mutate,
  };
}
