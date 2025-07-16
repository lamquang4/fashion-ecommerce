"use client";
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

export default function useGetProductsSlug(slug: string) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  if (slug !== "nam" && slug !== "nu") {
    return {
      products: [],
      totalPages: 1,
      totalItems: 0,
      currentPage: 1,
      isLoading: false,
      error: null,
      mutate: () => {},
    };
  }

  const query = new URLSearchParams({
    page: page.toString(),
  });
  const url = `/api/get-products3/${slug}?${query.toString()}`;

  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);
  return {
    products: data?.products ?? [],
    totalPages: data?.totalPages || 1,
    totalItems: data?.total || 0,
    currentPage: page,
    isLoading,
    error,
    mutate,
  };
}
