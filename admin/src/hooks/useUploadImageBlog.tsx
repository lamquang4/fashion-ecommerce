"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useUploadImageBlog() {
  const [isLoading, setIsLoading] = useState(false);
  const uploadImageBlog = async (formData: FormData) => {
    if (!formData) return;
    const loadingToast = toast.loading("Đang tải hình...");
    setIsLoading(true);
    try {
      const url = `/api/blogs/image`;
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.dismiss(loadingToast);
      toast.success("Tải hình thành công");

      return res.data.url;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  };

  return { uploadImageBlog, isLoading };
}
