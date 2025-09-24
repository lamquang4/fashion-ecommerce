"use client";
import { User } from "@/types/types";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useAddAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const addAdmin = async (data: User) => {
    const loadingToast = toast.loading("Đang thêm...");
    setIsLoading(true);
    try {
      const url = `/api/users/admins`;
      await axios.post(url, data);
      toast.dismiss(loadingToast);
      toast.success("Thêm thành công");
    } catch (err) {
      toast.dismiss(loadingToast);
      console.error("Lỗi:", err);
      throw err;
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  };

  return { addAdmin, isLoading };
}
