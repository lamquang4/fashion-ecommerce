"use client";
import { Category } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

interface ResponseType {
  category: Category;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCategory(id: string) {
  const url = id ? `/api/categories/${id}` : null;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  return {
    category: data?.category,
    isLoading,
    error,
    mutate,
  };
}
