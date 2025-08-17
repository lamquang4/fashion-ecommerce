"use client";
import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { User } from "@/types/types";

interface ResponseType {
  customers: User[];
  totalPages: number;
  total: number;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetCustomers() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const q = searchParams.get("q");
  const status = searchParams.get("status");

  const query = new URLSearchParams();
  if (page) query.set("page", page.toString());
  if (limit) query.set("limit", limit.toString());
  if (q) query.set("q", q);
  if (status) query.set("status", status.toString());

  const url = `/api/get-customers?${query.toString()}`;

  const { data, error, isLoading, mutate } = useSWR<ResponseType>(url, fetcher);
  return {
    customers: data?.customers ?? [],
    totalPages: data?.totalPages || 1,
    totalItems: data?.total || 0,
    currentPage: page,
    limit,
    isLoading,
    error,
    mutate,
  };
}
