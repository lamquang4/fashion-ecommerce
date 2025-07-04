"use client";
import axios from "axios";

export default function useUpdateCategory(id: string) {
  const updateCategory = async (formData: FormData) => {
    if (!id) return;
    try {
      const res = await axios.put(`/api/update-category/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.category;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { updateCategory };
}
