"use client";
import { Category } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

interface ResponseType {
  categories: Category[];
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCategories1() {
  const url = `/api/get-categories1`;

  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);
  return {
    categories: data?.categories ?? [],
    isLoading,
    error,
    mutate,
  };
}
