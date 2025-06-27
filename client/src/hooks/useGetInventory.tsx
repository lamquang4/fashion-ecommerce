"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export interface Inventory {
  _id: string;
  product: string;
  size: string;
  color: string;
  quantity: number;
}

export default function useGetInventory(id: string) {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const dispatch = useAppDispatch();

  const fetchInventory = async () => {
    dispatch(setLoading(true));
    if (!id) return;
    try {
      const res = await axios.get(`/api/get-inventory/${id}`);
      setInventories(res.data);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [id]);

  return {inventories, fetchInventory};
}
