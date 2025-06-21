"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export interface Color {
  _id: string;
  namecolor: string;
  codecolor: string;
  createdAt: string;
}

export default function useGetColors() {
  const [colors, setColors] = useState<Color[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const dispatch = useAppDispatch();

  const fetchColors = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(
        `/api/get-colors?page=${page}&limit=${limit}`
      );
      setColors(res.data.colors);
      setTotalPages(res.data.totalPages);
      setTotalItems(res.data.total);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchColors();
  }, [page, limit]);

  return {
    colors,
    fetchColors,
    totalPages,
    totalItems,
    currentPage: page,
    limit,
  };
}
