"use client";
import { Banner } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

interface ResponseType {
  collections: Banner[];
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCollections() {
  const url = `/api/get-collections`;

  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);

  return {
    collections: data?.collections ?? [],
    isLoading,
    error,
    mutate,
  };
}
