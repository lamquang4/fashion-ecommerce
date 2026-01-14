"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Variant } from "@/types/types";

interface ResponseType {
  inventories: Variant[];
  totalPages: number;
  total: number;
  totalQuantity: number;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetInventories() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const q = searchParams.get("q");

  const query = new URLSearchParams();
  if (page) query.set("page", page.toString());
  if (limit) query.set("limit", limit.toString());
  if (q) query.set("q", q);

  const url = `/api/inventories?${query.toString()}`;

  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  return {
    inventories: data?.inventories ?? [],
    totalPages: data?.totalPages || 1,
    totalItems: data?.total || 0,
    totalQuantity: data?.totalQuantity || 0,
    currentPage: page,
    limit,
    isLoading,
    error,
    mutate,
  };
}
