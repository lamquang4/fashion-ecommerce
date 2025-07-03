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
}

interface ResponseType {
  categories: Category[];
  categoriesStatus1: Category[];
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCategories1() {
  const url = `/api/get-categories1`;

  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);
  return {
    categories: data?.categories || [],
    categoriesStatus1: data?.categoriesStatus1 || [],
    isLoading,
    error,
    mutate,
  };
}
