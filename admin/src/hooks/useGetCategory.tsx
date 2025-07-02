"use client";
import Category from "@/model/Category";
import axios from "axios";
import useSWR from "swr";

export interface Category {
  _id?: string;
  namecategory: string;
  gender: number;
  image: string;
  slug: string;
  status: number;
  createdAt: string;
}

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
