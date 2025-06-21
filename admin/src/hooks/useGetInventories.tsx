"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export interface Inventory {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    image: string[];
  };
  size: {
    _id: string;
    namesize: string;
  };
  color: {
    _id: string;
    namecolor: string;
    codecolor: string;
  };
  quantity: number;
  createdAt: string;
}

export default function useGetInventories() {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const dispatch = useAppDispatch();

  const fetchInventories = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get("/api/get-inventories");
      setInventories(res.data);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchInventories();
  }, []);

  return { inventories, fetchInventories };
}
