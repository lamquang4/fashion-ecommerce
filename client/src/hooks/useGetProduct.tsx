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
  status?: number;
  category: string;
  createdAt?: string;
}

export default function useGetProduct(id: string) {
  const [product, setProduct] = useState<Product>();
  const dispatch = useAppDispatch();

  const fetchProduct = async () => {
    dispatch(setLoading(true));
    if (!id) return;
    try {
      const res = await axios.get(`/api/get-product/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return {product, fetchProduct};
}
