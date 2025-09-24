"use client";
import { User } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

interface ResponseType {
  user: User;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetUser(id: string) {
  const url = `/api/users/${id}`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  return {
    user: data?.user,
    isLoading,
    error,
    mutate,
  };
}
