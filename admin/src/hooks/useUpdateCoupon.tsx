"use client";
import { Coupon } from "@/types/types";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useUpdateCoupon(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const updateCoupon = async (data: Coupon) => {
    if (!id) return;
    const loadingToast = toast.loading("Đang cập nhật...");
    setIsLoading(true);
    try {
      const url = `/api/update-coupon/${id}`;
      await axios.put(url, data);
      toast.dismiss(loadingToast);
      toast.success("Cập nhật thành công");
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateCoupon, isLoading };
}
