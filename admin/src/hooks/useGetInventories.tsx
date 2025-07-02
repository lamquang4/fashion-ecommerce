"use client";
import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export interface Inventory {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    image: string[];
  };
  size: {
    _id: string;
    namesize: string;
  };
  color: {
    _id: string;
    namecolor: string;
    codecolor: string;
  };
  quantity: number;
  createdAt: string;
}

interface ResponseType {
  inventories: Inventory[];
  totalPages: number;
  total: number;
  totalQuantity: number;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetInventories() {
  const [keyword, setKeyword] = useState("");

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    keyword,
  });

  const url = `/api/get-inventories?${query.toString()}`;

  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);

  return {
    inventories: data?.inventories || [],
    totalPages: data?.totalPages || 1,
    totalItems: data?.total || 0,
    totalQuantity: data?.totalQuantity || 0,
    currentPage: page,
    limit,
    setKeyword,
    isLoading,
    error,
    mutate,
  };
}
