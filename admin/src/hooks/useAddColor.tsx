"use client";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export interface Color {
  _id?: string;
  namecolor: string;
  codecolor: string;
}

export default function useAddColor() {
  const dispatch = useAppDispatch();

  const addColor = async (data: Color) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post("/api/add-color", data);
      return res.data.color;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { addColor };
}
