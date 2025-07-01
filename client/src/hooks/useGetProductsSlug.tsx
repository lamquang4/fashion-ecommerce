"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number;
  description: string;
  image: string[];
  slug: string;
  status: number;
  category: {
    _id: string;
    namecategory: string;
    gender: number;
  };
  colors: {
    _id: string;
    namecolor: string;
    codecolor: string;
  }[];
  createdAt: string;
}

interface ResponseType {
  products: Product[];
  totalPages: number;
  total: number;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetProductsSlug(slug: string) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 10;
  const [keyword, setKeyword] = useState("");

  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    keyword,
  });
  const url = `/api/get-products/${slug}?${query.toString()}`;

  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);
  return {
    products: data?.products || [],
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
