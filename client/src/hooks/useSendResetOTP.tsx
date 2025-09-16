import axios from "axios";
import { useState } from "react";

export function useSendResetOTP() {
  const [isLoading, setIsLoading] = useState(false);
  const sendResetOTP = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      const url = `/api/auth/send-reset-otp`;
      await axios.post(url, data);
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendResetOTP, isLoading };
}
