"use client";
import axios from "axios";

export interface Color {
  _id?: string;
  namecolor: string;
  codecolor: string;
  createdAt?: string;
}

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
