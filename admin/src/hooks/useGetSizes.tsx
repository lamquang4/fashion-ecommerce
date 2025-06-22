"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export interface Size {
  _id: string;
  namesize: string;
  createdAt: string;
}

export default function useGetSizes() {
  const [sizes, setSizes] = useState<Size[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [keyword, setKeyword] = useState("");

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const dispatch = useAppDispatch();

  const fetchSizes = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(
        `/api/get-sizes?page=${page}&limit=${limit}`,
        {
          params: {
            keyword,
          },
        }
      );
      setSizes(res.data.sizes);
      setTotalPages(res.data.totalPages);
      setTotalItems(res.data.total);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchSizes();
  }, [page, limit, keyword]);

  return {
    sizes,
    fetchSizes,
    totalPages,
    totalItems,
    currentPage: page,
    limit,
    setKeyword,
  };
}
