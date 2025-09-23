"use client";
import { Category } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCategory(slug: string) {
  const url = `/api/categories/${slug}`;
  const { data, error, isLoading, mutate } = useSWR<Category>(url, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  return {
    category: data,
    error,
    isLoading,
    mutate,
  };
}
