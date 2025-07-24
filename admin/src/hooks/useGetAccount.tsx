"use client";
import { User } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetAccount() {
  const url = `/api/get-account`;

  const { data, error, isLoading, mutate } = useSWR<User>(url, fetcher);

  return {
    admin: data,
    error,
    isLoading,
    mutate,
  };
}
