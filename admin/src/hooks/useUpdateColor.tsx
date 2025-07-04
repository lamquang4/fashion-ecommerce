"use client";
import { Color } from "@/types/types";
import axios from "axios";

export default function useUpdateColor(id: string) {
  const updateColor = async (data: Color) => {
    if (!id) return;
    try {
      const res = await axios.put(`/api/update-color/${id}`, data);
      return res.data.color;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { updateColor };
}
