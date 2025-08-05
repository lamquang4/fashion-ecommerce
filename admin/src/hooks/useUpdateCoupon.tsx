"use client";
import { Coupon } from "@/types/types";
import axios from "axios";
import { useState } from "react";

export default function useUpdateCoupon(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const updateCoupon = async (data: Coupon) => {
    if (!id) return;
    setIsLoading(true);
    try {
      await axios.put(`/api/update-coupon/${id}`, data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateCoupon, isLoading };
}
