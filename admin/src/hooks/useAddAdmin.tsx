"use client";
import { User } from "@/types/types";
import axios from "axios";

export default function useAddAdmin() {
  const addAdmin = async (data: User) => {
    try {
      const res = await axios.post("/api/add-admin", data);
      return res.data.user;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { addAdmin };
}
