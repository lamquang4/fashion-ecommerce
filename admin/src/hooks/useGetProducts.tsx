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
  createdAt: string;
}

export default function useGetProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useAppDispatch();

  const fetchProducts = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get("/api/get-products");
      setProducts(res.data);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, fetchProducts };
}
