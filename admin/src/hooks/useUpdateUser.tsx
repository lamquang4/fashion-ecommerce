"use client";
import { User } from "@/types/types";
import axios from "axios";
import { useState } from "react";

export default function useUpdateUser(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const updateUser = async (data: User) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const url = `/api/update-user/${id}`;
      await axios.put(url, data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateUser, isLoading };
}
