"use client";
import { Address } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetAddress(id: string) {
  const url = `/api/get-address/${id}`;
  const { data, error, isLoading, mutate } = useSWR<Address>(url, fetcher);

  return {
    address: data,
    error,
    isLoading,
    mutate,
  };
}
