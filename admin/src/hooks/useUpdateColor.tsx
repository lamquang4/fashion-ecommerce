"use client";
import { Color } from "@/types/types";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useUpdateColor(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const updateColor = async (data: Color) => {
    if (!id) return;
    const loadingToast = toast.loading("Đang cập nhật...");
    setIsLoading(true);
    try {
      const url = `/api/colors/${id}`;
      await axios.put(url, data);
      toast.dismiss(loadingToast);
      toast.success("Cập nhật thành công");
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  };

  return { updateColor, isLoading };
}
