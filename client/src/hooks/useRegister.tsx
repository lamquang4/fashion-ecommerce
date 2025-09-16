"use client";
import axios from "axios";
import { useState } from "react";

export default function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const handleRegister = async (data: {
    fullname: string;
    email: string;
    phone: string;
    birthday: string;
    password: string;
    otp: string;
  }) => {
    setIsLoading(true);
    try {
      const url = `/api/auth/register`;
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
