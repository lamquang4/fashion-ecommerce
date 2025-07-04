"use client";
import { Size } from "@/types/types";
import axios from "axios";

export default function useUpdateSize(id: string) {
  const updateSize = async (data: Size) => {
    if (!id) return;
    try {
      const res = await axios.put(`/api/update-size/${id}`, data);
      return res.data.size;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { updateSize };
}
