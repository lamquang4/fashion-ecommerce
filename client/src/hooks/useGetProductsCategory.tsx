"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
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

export default function useGetProductsCategory(
  category?: string,
  product?: string
) {
  const [productsCateogry, setProductsCateogry] = useState<Product[]>([]);
  const dispatch = useAppDispatch();

  const fetchProductsCategory = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(`/api/get-products1/${category}/${product}`);
      setProductsCateogry(res.data.products);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchProductsCategory();
  }, [category, product]);

  return {
    productsCateogry,
    fetchProductsCategory,
  };
}
