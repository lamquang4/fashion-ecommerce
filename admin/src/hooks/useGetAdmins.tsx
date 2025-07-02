"use client";
import { useState } from "react";
import useSWR from "swr";
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

interface ResponseType {
  admins: User[];
  totalPages: number;
  total: number;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetAdmins() {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    keyword,
    status,
  });
  const url = `/api/get-admins?${query.toString()}`;

  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);
  return {
    admins: data?.admins || [],
    totalPages: data?.totalPages || 1,
    totalItems: data?.total || 0,
    currentPage: page,
    limit,
    setKeyword,
    setStatus,
    isLoading,
    error,
    mutate,
  };
}
