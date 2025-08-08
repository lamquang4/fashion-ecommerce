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
      const url = `/api/update-coupon/${id}`;
      await axios.put(url, data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateCoupon, isLoading };
}
