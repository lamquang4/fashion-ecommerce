"use client";
import { Coupon } from "@/types/types";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useAddCoupon() {
  const [isLoading, setIsLoading] = useState(false);
  const addCoupon = async (data: Coupon) => {
    const loadingToast = toast.loading("Đang thêm...");
    setIsLoading(true);
    try {
      const url = `/api/add-coupon`;
      await axios.post(url, data);
      toast.dismiss(loadingToast);
      toast.success("Thêm thành công");
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addCoupon, isLoading };
}
