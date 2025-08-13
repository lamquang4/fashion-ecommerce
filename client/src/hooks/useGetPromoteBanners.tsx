"use client";
import { Banner } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

type ResponseType = {
  promotebanners: Banner[];
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetPromoteBanners() {
  const url = `/api/get-promotebanners`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);

  return {
    promotebanners: data?.promotebanners || [],
    error,
    isLoading,
    mutate,
  };
}
