"use client";
import { Revenue } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

interface ResponseType {
  revenues: Revenue[];
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetRevenues(year: number) {
  const url = year ? `/api/revenues/${year}` : null;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  return {
    revenues: data,
    isLoading,
    error,
    mutate,
  };
}
