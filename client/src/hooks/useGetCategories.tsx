"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import useSWR from "swr";

export interface Category {
  _id: string;
  namecategory: string;
  gender: number;
  image: string;
  slug: string;
  status: number;
  productCount: number;
  createdAt: string;
}

type ResponseType = {
  categoriesMale: Category[];
  categoriesFemale: Category[];
};

const fetcher = (url: string): Promise<ResponseType> =>
  axios.get(url).then((res) => res.data);

export default function useGetCategories() {
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    "/api/get-categories",
    fetcher
  );

  return {
    categoriesMale: data?.categoriesMale ?? [],
    categoriesFemale: data?.categoriesFemale ?? [],
    error,
    isLoading,
    mutate,
  };
}
