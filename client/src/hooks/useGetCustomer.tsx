"use client";
import { User } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCustomer(id: string) {
  const shouldFetch = !!id;
  const url = shouldFetch ? `/api/get-customer/${id}` : null;

  const { data, error, isLoading, mutate } = useSWR<User>(url, fetcher);

  return {
    customer: data,
    error,
    isLoading,
    mutate,
  };
}
