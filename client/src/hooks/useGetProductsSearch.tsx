"use client";
import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Product } from "@/types/type";

interface ResponseType {
  products: Product[];
  totalPages: number;
  total: number;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetProductsSearch() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const [keyword, setKeyword] = useState("");
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const colors = searchParams.getAll("color");
  const sort = searchParams.get("sort");

  const query = new URLSearchParams();

  if (page) query.set("page", page.toString());
  if (min) query.set("min", min);
  if (max) query.set("max", max);
  if (sort) query.set("sort", sort);
  if (colors.length > 0) {
    colors.forEach((c) => query.append("color", c));
  }
  if (keyword) query.set("keyword", keyword);

  const url = `/api/get-products-search?${query.toString()}`;

  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);
  return {
    products: data?.products || [],
    totalPages: data?.totalPages || 1,
    totalItems: data?.total || 0,
    currentPage: page,
    setKeyword,
    isLoading,
    error,
    mutate,
  };
}
