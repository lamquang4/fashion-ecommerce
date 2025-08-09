"use client";
import { Category } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

type ResponseType = {
  categoriesMale: Category[];
  categoriesFemale: Category[];
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCategories() {
  const url = `/api/get-categories`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);
  return {
    categoriesMale: data?.categoriesMale || [],
    categoriesFemale: data?.categoriesFemale || [],
    error,
    isLoading,
    mutate,
  };
}
