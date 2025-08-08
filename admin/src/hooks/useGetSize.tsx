"use client";
import { Size } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

interface ResponseType {
  size: Size;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetSize(id: string) {
  const url = `/api/get-size/${id}`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);

  return {
    size: data?.size,
    isLoading,
    error,
    mutate,
  };
}
