"use client";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import Swal from "sweetalert2";

export default function useDeleteImage() {
  const dispatch = useAppDispatch();
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
      dispatch(setLoading(true));
      await axios.delete(`/api/delete-image/${id}`, {
        params: { image }, 
      });
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { deleteImage };
}
