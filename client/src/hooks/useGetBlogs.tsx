"use client";
import { Blog } from "@/types/type";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

type ResponseType = {
  blogs: Blog[];
  totalPages: number;
  total: number;
};

const fetcher = (url: string): Promise<ResponseType> =>
  axios.get(url).then((res) => res.data);

export default function useGetBlogs() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const query = new URLSearchParams();
  if (page) query.set("page", page.toString());

  const url = `/api/blogs?${query.toString()}`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  return {
    blogs: data?.blogs ?? [],
    totalPages: data?.totalPages || 1,
    totalItems: data?.total || 0,
    currentPage: page,
    error,
    isLoading,
    mutate,
  };
}
