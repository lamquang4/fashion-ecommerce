"use client";
import axios from "axios";
import Swal from "sweetalert2";

export default function useDeleteProduct() {
  const deleteProduct = async (id: string) => {
    const result = await Swal.fire({
      title: `Xác nhận xóa?`,
      text: `Bạn có chắc muốn xóa sản phẩm này không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed || !id) return;

    try {
      await axios.delete(`/api/delete-product/${id}`);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { deleteProduct };
}
