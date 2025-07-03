"use client";
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
