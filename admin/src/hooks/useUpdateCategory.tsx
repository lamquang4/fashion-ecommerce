"use client";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export default function useUpdateCategory(id: string) {
  const dispatch = useAppDispatch();

  const updateCategory = async (formData: FormData) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.put(`/api/update-category/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.category;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { updateCategory };
}
