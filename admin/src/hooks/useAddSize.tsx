"use client";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export interface Size {
  _id?: string;
  namesize: string;
}

export default function useAddSize() {
  const addSize = async (data: Size) => {
    try {
      const res = await axios.post("/api/add-size", data);
      return res.data.size;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { addSize };
}
