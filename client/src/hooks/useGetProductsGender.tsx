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

export default function useGetProductsGender() {
  const [productsMale, setProductsMale] = useState<Product[]>([]);
  const [productsFemale, setProductsFemale] = useState<Product[]>([]);
  const dispatch = useAppDispatch();

  const fetchProductsGender = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(`/api/get-products-gender`);
      setProductsMale(res.data.productsMale);
      setProductsFemale(res.data.productsFemale);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchProductsGender();
  }, []);

  return {
    productsMale,
    productsFemale,
    fetchProductsGender,
  };
}
