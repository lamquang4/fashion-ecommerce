"use client";
import axios from "axios";
import Swal from "sweetalert2";

export default function useDeleteImage() {
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

    try {
      await axios.delete(`/api/delete-image/${id}`, {
        params: { image },
      });
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { deleteImage };
}
