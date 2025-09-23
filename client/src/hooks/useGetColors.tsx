"use client";
import { Color } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

type ResponseType = {
  colors: Color[];
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetColors() {
  const url = `/api/colors`;
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
    error,
    isLoading,
    mutate,
  };
}
