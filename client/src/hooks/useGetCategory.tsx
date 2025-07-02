"use client";
import axios from "axios";
import useSWR from "swr";

export interface Category {
  _id: string;
  namecategory: string;
  gender: number;
  image: string;
  slug: string;
  status: number;
  productCount: number;
  createdAt: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCategory(slug: string) {
  const url = `/api/get-category/${slug}`;
  const { data, error, isLoading, mutate } = useSWR<Category>(url, fetcher);

  return {
    category: data,
    error,
    isLoading,
    mutate,
  };
}
