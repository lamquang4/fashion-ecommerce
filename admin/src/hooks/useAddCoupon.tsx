"use client";
import { Coupon } from "@/types/types";
import axios from "axios";
import { useState } from "react";

export default function useAddCoupon() {
  const [isLoading, setIsLoading] = useState(false);
  const addCoupon = async (data: Coupon) => {
    setIsLoading(true);
    try {
      const url = `/api/add-coupon`;
      await axios.post(url, data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addCoupon, isLoading };
}
