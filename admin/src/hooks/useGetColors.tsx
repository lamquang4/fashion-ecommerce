"use client";
import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Color } from "@/types/types";

interface ResponseType {
  colors: Color[];
  totalPages: number;
  total: number;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetColors() {
  const [keyword, setKeyword] = useState("");

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    keyword,
  });

  const url = `/api/get-colors?${query.toString()}`;

  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);
  return {
    colors: data?.colors ?? [],
    totalPages: data?.totalPages || 1,
    totalItems: data?.total || 0,
    currentPage: page,
    limit,
    setKeyword,
    isLoading,
    error,
    mutate,
  };
}
