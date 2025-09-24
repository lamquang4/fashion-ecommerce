"use client";
import { User } from "@/types/types";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useAddCustomer() {
  const [isLoading, setIsLoading] = useState(false);
  const addCustomer = async (data: User) => {
    const loadingToast = toast.loading("Đang thêm...");
    setIsLoading(true);
    try {
      const url = `/api/users/customers`;
      await axios.post(url, data);
      toast.dismiss(loadingToast);
      toast.success("Thêm thành công");
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  };

  return { addCustomer, isLoading };
}
