"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useAddCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const addCategory = async (formData: FormData) => {
      const loadingToast = toast.loading("Đang thêm...");
    setIsLoading(true);
    try {
      const url = `/api/add-category`;
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.dismiss(loadingToast);
      toast.success("Thêm thành công");
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addCategory, isLoading };
}
