"use client";
import { Banner } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

type ResponseType = {
  promotions: Banner[];
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetPromoteBanners() {
  const url = `/api/banners/promotion`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  return {
    promotions: data?.promotions ?? [],
    error,
    isLoading,
    mutate,
  };
}
