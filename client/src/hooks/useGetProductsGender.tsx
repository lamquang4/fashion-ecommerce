"use client";
import axios from "axios";
import useSWR from "swr";

export interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number;
  description: string;
  image: string[];
  slug: string;
  status: number;
  category: {
    _id: string;
    namecategory: string;
    gender: number;
  };
  colors: {
    _id: string;
    namecolor: string;
    codecolor: string;
  }[];
  createdAt: string;
}

type ResponseType = {
  productsMale: Product[];
  productsFemale: Product[];
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetProductsGender() {
  const url = `/api/get-products-gender`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);

  return {
    productsMale: data?.productsMale ?? [],
    productsFemale: data?.productsFemale ?? [],
    error,
    isLoading,
    mutate,
  };
}
