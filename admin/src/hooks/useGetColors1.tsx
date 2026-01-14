"use client";
import axios from "axios";
import useSWR from "swr";
import { Color } from "@/types/types";

interface ResponseType {
  colors: Color[];
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetColors1() {
  const url = `/api/colors1`;

  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );
  return {
    colors: data?.colors ?? [],
    isLoading,
    error,
    mutate,
  };
}
