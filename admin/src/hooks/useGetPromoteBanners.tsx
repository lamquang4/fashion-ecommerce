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

export default function useGetPromoteBanners() {
  const [promoteBanners, setPromoteBanners] = useState<Banner[]>([]);
  const dispatch = useAppDispatch();

  const fetchPromoteBanners = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get("/api/get-promotebanners");
      setPromoteBanners(res.data);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchPromoteBanners();
  }, []);

  return { promoteBanners, fetchPromoteBanners };
}
