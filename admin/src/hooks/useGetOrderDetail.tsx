"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { OrderDetail } from "@/types/types";


export default function useGetOrderDetail(id: string) {
  const [orderDetail, setOrderDetail] = useState<OrderDetail>();

  const fetchOrderDetail = async () => {
    if (!id) return;
    try {
      const res = await axios.get(`/api/get-orderdetail/${id}`);
      setOrderDetail(res.data);
    } catch (err) {
      console.error("Lỗi:", err);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  return orderDetail;
}
