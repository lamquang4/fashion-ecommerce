"use client";
import axios from "axios";

export default function useUpdateImage() {
  const updateImage = async (formData: FormData, id: string) => {
    if (!id) return;
    try {
      const res = await axios.put(`/api/update-image/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.image;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { updateImage };
}
