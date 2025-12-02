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
    if (
      !data.fullname ||
      !data.email ||
      !data.phone ||
      !data.birthday ||
      !data.password ||
      !data.otp
    ) {
      return;
    }
    setIsLoading(true);
    try {
      const url = `/api/auth/user`;
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
