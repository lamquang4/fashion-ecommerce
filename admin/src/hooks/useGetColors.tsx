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

export default function useGetColors() {
  const [colors, setColors] = useState<Color[]>([]);
  const dispatch = useAppDispatch();

  const fetchColors = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get("/api/get-colors");
      setColors(res.data);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchColors();
  }, []);

  return { colors, fetchColors };
}
