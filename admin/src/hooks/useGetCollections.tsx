"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export interface Banner {
  _id: string;
  image: string;
  type: number;
  status: number;
}

export default function useGetCollections() {
  const [collections, setCollections] = useState<Banner[]>([]);
  const dispatch = useAppDispatch();

  const fetchCollections = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get("/api/get-collections");
      setCollections(res.data);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return { collections, fetchCollections };
}
