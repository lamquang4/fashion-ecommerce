"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export interface Order {
  _id: string;
  orderCode: string;
  user: string;
  address: {
    fullname: string;
    phone: string;
    speaddress: string;
    city: string;
    district: string;
    ward: string;
  };
  paymethod: number;
  coupon?: string;
  status: number;
  total: number;
  createdAt: string;
}

export default function useGetOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalSold, setTotalSold] = useState(0);
  const [totalStatus0, setTotalStatus0] = useState(0);
  const [totalStatus3, setTotalStatus3] = useState(0);
  const [totalStatus4, setTotalStatus4] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const dispatch = useAppDispatch();

  const fetchOrders = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(
        `/api/get-orders?page=${page}&limit=${limit}`,
        {
          params: {
            keyword,
            status,
          },
        }
      );
      setOrders(res.data.orders);
      setTotalPages(res.data.totalPages);
      setTotalItems(res.data.total);
      setTotalRevenue(res.data.totalRevenue);
      setTotalSold(res.data.totalSold);
      setTotalStatus0(res.data.totalStatus0);
      setTotalStatus3(res.data.totalStatus3);
      setTotalStatus4(res.data.totalStatus4);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, limit, keyword, status]);

  return {
    orders,
    fetchOrders,
    totalPages,
    totalItems,
    totalRevenue,
    totalSold,
    currentPage: page,
    limit,
    setKeyword,
    setStatus,
    totalStatus0,
    totalStatus3,
    totalStatus4,
  };
}
