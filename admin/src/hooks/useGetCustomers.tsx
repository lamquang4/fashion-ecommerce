"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export interface User {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  birthday: string;
  password: string;
  role: number;
  status: number;
  createdAt: string;
}

export default function useGetCustomers() {
  const [customers, setCustomers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const dispatch = useAppDispatch();

  const fetchCustomers = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(
        `/api/get-customers?page=${page}&limit=${limit}`,
        {
          params: {
            keyword,
            status,
          },
        }
      );
      setCustomers(res.data.customers);
      setTotalPages(res.data.totalPages);
      setTotalItems(res.data.total);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [page, limit, keyword, status]);

  return {
    customers,
    fetchCustomers,
    totalPages,
    totalItems,
    currentPage: page,
    limit,
    setKeyword,
    setStatus,
  };
}
