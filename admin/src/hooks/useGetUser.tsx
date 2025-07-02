"use client";
import axios from "axios";
import useSWR from "swr";

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

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetUser(id: string) {
  const url = `/api/get-user/${id}`;
  const { data, error, isLoading, mutate } = useSWR<User>(url, fetcher);

  return {
    user: data,
    isLoading,
    error,
    mutate,
  };
}
