import axios from "axios";
import { useState } from "react";

export function useSendResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const sendResetPassword = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      const url = `/api/auth/send-reset`;
      await axios.post(url, data);
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendResetPassword, isLoading };
}
