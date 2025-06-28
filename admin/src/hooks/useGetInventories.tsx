"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import { useSearchParams } from "next/navigation";

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
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [keyword, setKeyword] = useState("");

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const dispatch = useAppDispatch();

  const fetchInventories = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(
        `/api/get-inventories?page=${page}&limit=${limit}`,
        {
          params: {
            keyword,
          },
        }
      );
      setInventories(res.data.inventories);
      setTotalPages(res.data.totalPages);
      setTotalItems(res.data.total);
      setTotalQuantity(res.data.totalQuantity);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchInventories();
  }, [page, limit, keyword]);

  return {
    inventories,
    fetchInventories,
    totalPages,
    totalItems,
    currentPage: page,
    limit,
    setKeyword,
    totalQuantity,
  };
}
