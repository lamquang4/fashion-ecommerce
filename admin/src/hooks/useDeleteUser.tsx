"use client";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import Swal from "sweetalert2";

export default function useDeleteUser(fetchUsers: () => void) {
  const dispatch = useAppDispatch();
  const deleteUser = async (id: string) => {
    const result = await Swal.fire({
      title: `Xác nhận xóa?`,
      text: `Bạn có chắc muốn xóa người dùng này không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed || !id) return;

    try {
      dispatch(setLoading(true));
      await axios.delete(`/api/delete-user/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { deleteUser };
}
