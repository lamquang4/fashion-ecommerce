"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export interface Coupon {
  _id: string;
  code: string;
  discountValue: number;
  discountType: string;
  minOrderValue?: number;
  maxDiscountValue?: number;
}

export interface Address {
  fullname: string;
  phone: string;
  speaddress: string;
  ward: string;
  district: string;
  city: string;
}

export interface Order {
  _id: string;
  address: Address;
  coupon?: Coupon;
  paymethod: number;
  status: number;
  total: number;
  createdAt: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  discount: number;
}

export interface Size {
  _id: string;
  namesize: string;
}

export interface Color {
  _id: string;
  namecolor: string;
  codecolor: string;
}

export interface Buy {
  product: Product;
  size: Size;
  color: Color;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderDetail {
  _id: string;
  order: Order;
  buy: Buy[];
}

export default function useGetOrderDetail(id: string) {
  const [orderDetail, setOrderDetail] = useState<OrderDetail>();
  const dispatch = useAppDispatch();

  const fetchOrderDetail = async () => {
    dispatch(setLoading(true));
    if (!id) return;
    try {
      const res = await axios.get(`/api/get-orderdetail/${id}`);
      setOrderDetail(res.data);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  return orderDetail;
}
