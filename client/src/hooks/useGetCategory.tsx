"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export interface Category {
  _id?: string;
  namecategory: string;
  gender: number;
  image: string;
  slug: string;
  status: number;
  createdAt: string;
}

export default function useGetCategory(id: string) {
  const [category, setCategory] = useState<Category>();
  const dispatch = useAppDispatch();

  const fetchCategory = async () => {
    dispatch(setLoading(true));
    if (!id) return;
    try {
      const res = await axios.get(`/api/get-category/${id}`);
      setCategory(res.data);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  return category;
}
