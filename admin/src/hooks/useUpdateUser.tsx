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
  role?: number;
  status?: number;
  createdAt?: string;
}

export default function useUpdateUser(id: string) {
  const dispatch = useAppDispatch();
  const updateUser = async (data: User) => {
    if (!id) throw new Error("ID không hợp lệ");
    try {
      dispatch(setLoading(true));
      const res = await axios.put(`/api/update-user/${id}`, data);
      return res.data.user;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { updateUser };
}
