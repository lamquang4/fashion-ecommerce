"use client";
import { Banner } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

type ResponseType = {
  banners1: Banner[];
  banners2: Banner[];
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetMainBanners() {
  const url = `/api/get-mainbanners`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);

  return {
    banners1: data?.banners1 ?? [],
    banners2: data?.banners2 ?? [],
    error,
    isLoading,
    mutate,
  };
}
