"use client";
import axios from "axios";

export interface Size {
  _id?: string;
  namesize: string;
}

export default function useUpdateSize(id: string) {
  const updateSize = async (data: Size) => {
    if (!id) throw new Error("ID không hợp lệ");
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
