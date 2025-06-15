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

export default function useGetUser(id: string) {
  const [user, setUser] = useState<User>();
  const dispatch = useAppDispatch();

  const fetchUser = async () => {
    dispatch(setLoading(true));
    if (!id) return;
    try {
      const res = await axios.get(`/api/get-user/${id}`);
      setUser(res.data);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  return user;
}
