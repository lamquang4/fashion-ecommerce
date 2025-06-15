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

export default function useGetAdmins() {
  const [admins, setAdmins] = useState<User[]>([]);
  const dispatch = useAppDispatch();

  const fetchAdmins = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get("/api/get-admins");
      setAdmins(res.data);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return { admins, fetchAdmins };
}
