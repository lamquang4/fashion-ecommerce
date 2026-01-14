"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useUpdateBlog(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const updateBlog = async (formData: FormData) => {
    if (!id || !formData) return;
    const loadingToast = toast.loading("Đang cập nhật...");
    setIsLoading(true);
    try {
      const url = `/api/blogs/${id}`;
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

  return { updateBlog, isLoading };
}
