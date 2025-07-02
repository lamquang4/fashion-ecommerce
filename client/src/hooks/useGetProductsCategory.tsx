"use client";
import useSWR from "swr";
import axios from "axios";
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

const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data.products);

export default function useGetProductsCategory(
  category: string,
  product: string
) {
  const url = `/api/get-products1/${category}/${product}`;
  const { data, error, isLoading, mutate } = useSWR<Product[]>(url, fetcher);

  return {
    productsCateogry: data,
    isLoading,
    error,
    mutate,
  };
}
