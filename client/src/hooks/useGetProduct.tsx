"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export interface Product {
  _slug: string;
  name: string;
  price: number;
  discount: number;
  description: string;
  image: string[];
  slug: string;
  status?: number;
  category: string;
  createdAt?: string;
}

export default function useGetProduct(slug: string) {
  const [product, setProduct] = useState<Product>();
  const dispatch = useAppDispatch();

  const fetchProduct = async () => {
    dispatch(setLoading(true));
    if (!slug) return;
    try {
      const res = await axios.get(`/api/get-products/${slug}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  return {product, fetchProduct};
}
