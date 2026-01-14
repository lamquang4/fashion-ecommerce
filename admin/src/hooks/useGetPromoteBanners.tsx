"use client";
import { Banner } from "@/types/types";
import axios from "axios";
import useSWR from "swr";
interface ResponseType {
  promotebanners: Banner[];
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetPromoteBanners() {
  const url = `/api/banners/promotions`;

  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  return {
    promotebanners: data?.promotebanners ?? [],
    mutate,
    error,
    isLoading,
  };
}
