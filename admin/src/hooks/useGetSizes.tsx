"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export interface Size {
  _id: string;
  namesize: string;
  createdAt: string;
}

export default function useGetSizes() {
  const [sizes, setSizes] = useState<Size[]>([]);
  const dispatch = useAppDispatch();

  const fetchSizes = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get("/api/get-sizes");
      setSizes(res.data);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchSizes();
  }, []);

  return { sizes, fetchSizes };
}
