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
  status?: number;
  category: string;
  inventory: {
    _id: string;
    product: string;
    quantity: number;
    color: string;
    size: string;
  }[];
  createdAt?: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetProduct(id: string) {

  const url = `/api/get-product/${id}`;
  const { data, error, isLoading, mutate } = useSWR<Product>(url, fetcher);

  return {
    product: data,
    isLoading,
    error,
    mutate,
  };
}
