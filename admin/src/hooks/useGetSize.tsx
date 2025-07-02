"use client";
import axios from "axios";
import useSWR from "swr";

export interface Size {
  _id: string;
  namesize: string;
  createdAt: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetSize(id: string) {
  const url = `/api/get-size/${id}`;
  const { data, error, isLoading, mutate } = useSWR<Size>(url, fetcher);

  return {
    size: data,
    isLoading,
    error,
    mutate,
  };
}
