"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useUpdateBanner() {
  const [isLoading, setIsLoading] = useState(false);
  const updateBanner = async (formData: FormData) => {
    const loadingToast = toast.loading("Đang cập nhật...");
    setIsLoading(true);
    try {
      const url = `/api/update-banner`;
      await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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

  return { updateBanner, isLoading };
}
