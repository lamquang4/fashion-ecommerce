"use client";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export interface Color {
  _id?: string;
  namecolor: string;
  codecolor: string;
  createdAt?: string;
}

export default function useUpdateColor(id: string) {
  const dispatch = useAppDispatch();
  const updateColor = async (data: Color) => {
    if (!id) return;
    try {
      dispatch(setLoading(true));
      const res = await axios.put(`/api/update-color/${id}`, data);
      return res.data.color;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { updateColor };
}
