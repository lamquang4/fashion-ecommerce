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

export default function useGetPromoteBanners() {
  const url = `/api/get-promotebanners`;

  const { data, error, isLoading, mutate } = useSWR<Banner[]>(url, fetcher);

  return { promotebanners: data ?? [], mutate, error, isLoading };
}
