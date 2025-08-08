"use client";
import { User } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

interface ResponseType {
  user: User;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetUser(id: string) {
  const url = `/api/get-user/${id}`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);

  return {
    user: data?.user,
    isLoading,
    error,
    mutate,
  };
}
