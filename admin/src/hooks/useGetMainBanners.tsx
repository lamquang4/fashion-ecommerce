"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export interface Banner {
  _id: string;
  image: string;
  type: number;
  status: number;
  createdAt: string;
}

export default function useGetMainBanners() {
  const [mainBanners, setMainBanners] = useState<Banner[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const dispatch = useAppDispatch();

  const fetchMainBanners = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(
        `/api/get-mainbanners?page=${page}&limit=${limit}`,
        {
          params: {
            status,
            type,
          },
        }
      );
      setMainBanners(res.data.mainbanners);
      setTotalPages(res.data.totalPages);
      setTotalItems(res.data.total);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchMainBanners();
  }, [page, limit, status, type]);

  return {
    mainBanners,
    fetchMainBanners,
    totalPages,
    totalItems,
    currentPage: page,
    limit,
    setStatus,
    setType,
  };
}
