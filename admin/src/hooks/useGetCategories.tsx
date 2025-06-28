"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import { useSearchParams } from "next/navigation";

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
  const [categoriesStatus1, setCategoriesStatus1] = useState<Category[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const dispatch = useAppDispatch();

  const fetchCategories = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(
        `/api/get-categories?page=${page}&limit=${limit}`,
        {
          params: {
            keyword,
            status,
          },
        }
      );
      setCategories(res.data.categories);
      setTotalPages(res.data.totalPages);
      setTotalItems(res.data.total);
      setCategoriesStatus1(res.data.categoriesStatus1);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page, limit, keyword, status]);

  return {
    categories,
    categoriesStatus1,
    fetchCategories,
    totalPages,
    totalItems,
    currentPage: page,
    limit,
    setKeyword,
    setStatus,
  };
}
