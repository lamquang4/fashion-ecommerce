import axios from "axios";
import { useState } from "react";

export function useResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const resetPassword = async (data: {
    otp: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      const url = `/api/auth/password`;
      await axios.post(url, data);
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { resetPassword, isLoading };
}
