"use client";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export interface Product {
  _id?: string;
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

export default function useAddProduct() {
  const dispatch = useAppDispatch();

  const addProduct = async (data: Product) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post("/api/add-product", data);
      return res.data.product;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return addProduct;
}
