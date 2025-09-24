"use client";
import { Color } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

interface ResponseType {
  color: Color;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetColor(id: string) {
  const url = `/api/colors/${id}`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  return {
    color: data?.color,
    isLoading,
    error,
    mutate,
  };
}
