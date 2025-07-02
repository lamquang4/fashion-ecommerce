"use client";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import Swal from "sweetalert2";
export interface Product {
  _id: string;
  name?: string;
  price?: number;
  discount?: number;
  description?: string;
  image?: string[];
  slug?: string;
  status: number;
  Product?: string;
  createdAt?: string;
}

export default function useVisibleProduct() {
  const dispatch = useAppDispatch();
  const visibleProduct = async (data: Product) => {
    const action = data.status === 1 ? "hiện" : "ẩn";
    const result = await Swal.fire({
      title: `Xác nhận ${action}?`,
      text: `Bạn có chắc muốn ${action} sản phẩm này không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed) {
      return;
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.put("/api/visible-product", {
        id: data._id,
        status: data.status,
      });
      return res.data.product;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { visibleProduct };
}
