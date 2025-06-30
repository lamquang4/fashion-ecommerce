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
  inventories: {
    _id: string;
    color: string;
    size: string;
    quantity: number;
  }[];
  createdAt: string;
}

export default function useGetProductSlug(slug: string) {
  const [product, setProduct] = useState<Product>();
  const dispatch = useAppDispatch();

  const fetchProduct = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(`/api/get-product/${slug}`);
      setProduct(res.data.product);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return {
    product,
    fetchProduct,
  };
}
