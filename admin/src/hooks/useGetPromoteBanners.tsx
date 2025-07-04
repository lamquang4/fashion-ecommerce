"use client";
import { Banner } from "@/types/types";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetPromoteBanners() {
  const url = `/api/get-promotebanners`;

  const { data, error, isLoading, mutate } = useSWR<Banner[]>(url, fetcher);

  return { promotebanners: data ?? [], mutate, error, isLoading };
}
