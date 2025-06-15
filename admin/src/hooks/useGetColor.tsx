"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export interface Color {
  _id: string;
  namecolor: string;
  codecolor: string;
  createdAt: string;
}

export default function useGetColor(id: string) {
  const [color, setColor] = useState<Color>();
  const dispatch = useAppDispatch();

  const fetchColor = async () => {
    dispatch(setLoading(true));
    if (!id) return;
    try {
      const res = await axios.get(`/api/get-color/${id}`);
      setColor(res.data);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchColor();
  }, [id]);

  return color;
}
