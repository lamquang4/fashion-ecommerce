"use client";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export default function useUpdateProduct(id: string) {
  const dispatch = useAppDispatch();

  const updateProduct = async (formData: FormData) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.put(`/api/update-product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.product;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { updateProduct };
}
