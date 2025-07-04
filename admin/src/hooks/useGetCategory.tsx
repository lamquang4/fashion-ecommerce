"use client";
import { Category } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCategory(id: string) {
  const url = `/api/get-category/${id}`;
  const { data, error, isLoading, mutate } = useSWR<Category>(url, fetcher);

  return {
    category: data,
    isLoading,
    error,
    mutate,
  };
}
