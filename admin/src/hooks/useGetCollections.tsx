"use client";
import { Banner } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCollections() {
  const url = `/api/get-collections`;

  const { data, error, isLoading, mutate } = useSWR<Banner[]>(url, fetcher);

  return { collections: data ?? [], error, isLoading, mutate };
}
