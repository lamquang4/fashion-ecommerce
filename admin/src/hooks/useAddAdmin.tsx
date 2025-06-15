"use client";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export interface User {
  _id?: string;
  fullname: string;
  email: string;
  phone: string;
  birthday: string;
  password: string;
  role: number;
  status?: number;
  createdAt?: string;
}

export default function useAddAdmin() {
  const dispatch = useAppDispatch();

  const addAdmin = async (data: User) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post("/api/add-admin", data);
      return res.data.user;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { addAdmin };
}
