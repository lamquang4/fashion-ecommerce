"use client";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import Swal from "sweetalert2";

export default function useDeleteBanner(fetchBanners: () => void) {
  const dispatch = useAppDispatch();
  const deleteBanner = async (id: string) => {
    const result = await Swal.fire({
      title: `Xác nhận xóa?`,
      text: `Bạn có chắc muốn xóa banner này không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed || !id) return;

    try {
      dispatch(setLoading(true));
      await axios.delete(`/api/delete-banner/${id}`);
      fetchBanners();
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { deleteBanner };
}
