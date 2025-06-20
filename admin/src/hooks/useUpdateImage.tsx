"use client";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";

export default function useUpdateImage(id: string) {
  const dispatch = useAppDispatch();

  const updateImage = async (formData: FormData) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.put(`/api/update-image/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.image;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { updateImage };
}
