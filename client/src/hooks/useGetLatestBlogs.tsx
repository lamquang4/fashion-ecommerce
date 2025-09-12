"use client";
import { Blog } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

type ResponseType = {
  blogs: Blog[];
};

const fetcher = (url: string): Promise<ResponseType> =>
  axios.get(url).then((res) => res.data);

export default function useGetBlogs() {
  const url = `/api/get-latest-blogs`;
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
    error,
    isLoading,
    mutate,
  };
}
