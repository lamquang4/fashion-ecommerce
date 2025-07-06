"use client";
import { Province } from "@/types/type";
import axios from "axios";
import useSWR from "swr";

type ResponseType = {
  data: Province[];
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetProvinces() {
  const url = `https://vietnamlabs.com/api/vietnamprovince`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);

  return {
    provinces: data?.data,
    error,
    isLoading,
    mutate,
  };
}
