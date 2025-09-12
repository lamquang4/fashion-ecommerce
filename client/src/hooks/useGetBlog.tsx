"use client";
import { Blog } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetBlog(slug: string) {
  const url = slug ? `/api/get-blog/${slug}` : null;
  const { data, error, isLoading, mutate } = useSWR<Blog>(url, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  return {
    blog: data,
    error,
    isLoading,
    mutate,
  };
}
