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

export default function useGetSize(id: string) {
  const [size, setSize] = useState<Size>();
  const dispatch = useAppDispatch();

  const fetchSize = async () => {
    dispatch(setLoading(true));
    if (!id) return;
    try {
      const res = await axios.get(`/api/get-size/${id}`);
      setSize(res.data);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchSize();
  }, [id]);

  return size;
}
