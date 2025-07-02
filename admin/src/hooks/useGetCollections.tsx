"use client";
import axios from "axios";
import useSWR from "swr";

export interface Banner {
  _id: string;
  image: string;
  type: number;
  status: number;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCollections() {
  const url = `/api/get-collections`;

  const { data, error, isLoading, mutate } = useSWR<Banner[]>(url, fetcher);

  return { collections: data ?? [], error, isLoading, mutate };
}
