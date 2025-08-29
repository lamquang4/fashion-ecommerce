"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      await signIn("credentials", {
        email: data.email.trim(),
        password: data.password.trim(),
        redirect: false,
      });
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading };
}
