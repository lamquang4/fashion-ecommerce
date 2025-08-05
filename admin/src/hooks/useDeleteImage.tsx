"use client";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function useDeleteImage() {
  const [isLoading, setIsLoading] = useState(false);
  const deleteImage = async (id: string, image: string) => {
    const result = await Swal.fire({
      title: `Xác nhận xóa?`,
      text: `Bạn có chắc muốn xóa hình sản phẩm này không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed || !id || !image) return;

    setIsLoading(true);

    try {
      await axios.delete(`/api/delete-image/${id}`, {
        params: { image },
      });
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteImage, isLoading };
}
