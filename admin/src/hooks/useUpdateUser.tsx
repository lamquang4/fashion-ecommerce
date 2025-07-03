"use client";
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
  const updateUser = async (data: User) => {
    if (!id) throw new Error("ID không hợp lệ");
    try {
      const res = await axios.put(`/api/update-user/${id}`, data);
      return res.data.user;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { updateUser };
}
