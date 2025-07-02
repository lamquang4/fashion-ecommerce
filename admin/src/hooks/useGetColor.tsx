"use client";
import axios from "axios";
import useSWR from "swr";

export interface Color {
  _id: string;
  namecolor: string;
  codecolor: string;
  createdAt: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetColor(id: string) {
  const url = `/api/get-color/${id}`;
  const { data, error, isLoading, mutate } = useSWR<Color>(url, fetcher);

  return {
    color: data,
    isLoading,
    error,
    mutate,
  };
}
