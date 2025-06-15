"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export interface Category {
  _id: string;
  namecategory: string;
  gender: number;
  image: string;
  slug: string;
  status: number;
  createdAt: string;
}

export default function useGetCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const dispatch = useAppDispatch();

  const fetchCategories = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get("/api/get-categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, fetchCategories };
}
