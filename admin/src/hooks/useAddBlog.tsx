"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useAddBlog() {
  const [isLoading, setIsLoading] = useState(false);
  const addBlog = async (formData: FormData) => {
    const loadingToast = toast.loading("Đang thêm...");
    setIsLoading(true);
    try {
      const url = `/api/add-blog`;
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
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  };

  return { addBlog, isLoading };
}
