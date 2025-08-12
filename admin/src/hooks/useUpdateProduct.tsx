"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useUpdateProduct(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const updateProduct = async (formData: FormData) => {
    if (!id) return;
    const loadingToast = toast.loading("Đang cập nhật...");
    setIsLoading(true);
    try {
      const url = `/api/update-product/${id}`;
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
      setIsLoading(false);
    }
  };

  return { updateProduct, isLoading };
}
