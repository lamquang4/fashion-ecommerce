"use client";
import { User } from "@/types/type";
import axios from "axios";
import { useState } from "react";

export default function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const handleRegister = async (data: User) => {
    setIsLoading(true);
    try {
      const url = `/api/register`;
      await axios.post(url, data);
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleRegister, isLoading };
}
