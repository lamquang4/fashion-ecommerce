"use client";
import { User } from "@/types/types";
import axios from "axios";

export default function useUpdateUser(id: string) {
  const updateUser = async (data: User) => {
    if (!id) return;
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
