"use client";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import Swal from "sweetalert2";

export default function useDeleteSize(fetchSizes: () => void) {
  const dispatch = useAppDispatch();
  const deleteSize = async (id: string) => {
    const result = await Swal.fire({
      title: `Xác nhận xóa?`,
      text: `Bạn có chắc muốn xóa kích thước này không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed || !id) return;

    try {
      dispatch(setLoading(true));
      const res = await axios.delete(`/api/delete-size/${id}`);
      fetchSizes();
      return res.data.size;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { deleteSize };
}
