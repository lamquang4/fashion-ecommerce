"use client";
import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Product } from "@/types/type";

interface ResponseType {
  products: Product;
  totalPages: number;
  total: number;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetProductsSearch() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const [keyword, setKeyword] = useState("");

  const query = new URLSearchParams({
    page: page.toString(),
    keyword,
  });
  const url = `/api/get-products2?${query.toString()}`;

  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);
  return {
    products: data?.products,
    totalPages: data?.totalPages || 1,
    totalItems: data?.total || 0,
    currentPage: page,
    setKeyword,
    isLoading,
    error,
    mutate,
  };
}
