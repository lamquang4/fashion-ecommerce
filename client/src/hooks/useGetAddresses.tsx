"use client";
import { Address } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

type ResponseType = {
  addresses: Address[];
};

const fetcher = (url: string): Promise<ResponseType> =>
  axios.get(url).then((res) => res.data);

export default function useGetAddresses(id: string) {
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    `/api/get-addresses/${id}`,
    fetcher
  );

  return {
    addresses: data?.addresses ?? [],
    error,
    isLoading,
    mutate,
  };
}
