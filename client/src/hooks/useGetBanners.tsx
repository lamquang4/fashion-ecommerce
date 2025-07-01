"use client";
import axios from "axios";
import useSWR from "swr";

export interface Banner {
  _id: string;
  image: string;
  type: number;
  status: number;
  createdAt: string;
}

type ResponseType = {
  banners1: Banner[];
  banners2: Banner[];
  promotebanners: Banner[];
  collections: Banner[];
};

const fetcher = (url: string): Promise<ResponseType> =>
  axios.get(url).then((res) => res.data);

export default function useGetMainBanners() {
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    "/api/get-banners",
    fetcher
  );

  return {
    banners1: data?.banners1 ?? [],
    banners2: data?.banners2 ?? [],
    promotebanners: data?.promotebanners ?? [],
    collections: data?.collections ?? [],
    error,
    isLoading,
    mutate,
  };
}
