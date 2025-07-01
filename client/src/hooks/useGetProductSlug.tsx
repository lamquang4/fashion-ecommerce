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
  inventories: {
    _id: string;
    color: string;
    size: string;
    quantity: number;
  }[];
  createdAt: string;
}
const fetcher = (url: string) => axios.get(url).then((res) => res.data.product);

export default function useGetProductSlug(slug: string) {
  const {
    data: product,
    error,
    isLoading,
    mutate,
  } = useSWR<Product>(slug ? `/api/get-product/${slug}` : null, fetcher);

  return {
    product,
    loading: isLoading,
    error,
    mutate,
  };
}
