"use client";
import useSWR from "swr";
import axios from "axios";
export interface SizeColor {
  sizes: {
    _id: string;
    namesize: string;
  }[];
  colors?: {
    _id: string;
    namecolor: string;
    codecolor: string;
  }[];
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetSizeColorProduct(slug: string) {
  const { data, error, isLoading, mutate } = useSWR<SizeColor>(
    slug ? `/api/get-size-color/${slug}` : null,
    fetcher
  );

  return {
    sizes: data?.sizes || [],
    colors: data?.colors || [],
    isLoading,
    error,
    mutate,
  };
}
