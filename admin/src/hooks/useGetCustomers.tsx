"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

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
  const dispatch = useAppDispatch();

  const fetchCustomers = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get("/api/get-customers");
      setCustomers(res.data);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return { customers, fetchCustomers };
}
