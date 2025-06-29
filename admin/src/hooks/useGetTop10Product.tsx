"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export interface Product {
  _id: string;
  name: string;
  image: string[];
  totalSold: number;
  price: number;
  discount: number;
}

export default function useGetTop10Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useAppDispatch();

  const fetchProducts = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(`/api/get-top10products`);
      setProducts(res.data.top10Products);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    fetchProducts,
  };
}
