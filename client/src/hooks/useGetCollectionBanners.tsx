"use client";
import { Banner } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

type ResponseType = {
  collections: Banner[];
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCollectionBanners() {
  const url = `/api/get-collectionbanners`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  return {
    collections: data?.collections ?? [],
    error,
    isLoading,
    mutate,
  };
}
