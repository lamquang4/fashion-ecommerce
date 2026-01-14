"use client";
import { Size } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

type ResponseType = {
  sizes: Size[];
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetSizes() {
  const url = `/api/sizes`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  return {
    sizes: data?.sizes ?? [],
    error,
    isLoading,
    mutate,
  };
}
