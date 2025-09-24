"use client";
import { Blog } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

interface ResponseType {
  blog: Blog;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetBlog(id: string) {
  const url = `/api/blogs/${id}`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  return {
    blog: data?.blog,
    isLoading,
    error,
    mutate,
  };
}
