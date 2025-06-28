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
  createdAt: string;
}

export default function useGetMainBanners() {
  const [banners1, setBanners1] = useState<Banner[]>([]);
  const [banners2, setBanners2] = useState<Banner[]>([]);
  const [promotebanners, setPromoteBanners] = useState<Banner[]>([]);
  const [collections, setCollections] = useState<Banner[]>([]);
  const dispatch = useAppDispatch();

  const fetchMainBanners = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(`/api/get-banners`);
      setBanners1(res.data.banners1);
      setBanners2(res.data.banners2);
      setPromoteBanners(res.data.promotebanners);
      setCollections(res.data.collections);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchMainBanners();
  }, []);

  return {
    banners1,
    banners2,
    promotebanners,
    collections,
    fetchMainBanners,
  };
}
