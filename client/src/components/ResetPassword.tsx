"use client";
import { useSendResetPassword } from "@/hooks/useSendResetPassword";
import { validateEmail } from "@/utils/validateEmail";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import Overplay from "./Overplay";
import Loading from "./Loading";
import { useSearchParams } from "next/navigation";
import { useResetPassword } from "@/hooks/useResetPassword";

function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { sendResetPassword, isLoading: isLoadingSendResetPassword } =
    useSendResetPassword();
  const { resetPassword, isLoading: isLoadingResetPassword } =
    useResetPassword();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (token) {
      if (password.length < 6) {
        toast.error("Mật khẩu phải có ít nhất 6 ký tự");
        return;
      }
    } else {
      if (!validateEmail(email)) {
        toast.error("Email không hợp lệ");
        return;
      }

      if (email === process.env.EMAIL_USER) {
        toast.error("Email này không đặt lại mật khẩu được!");
        return;
      }
    }

    try {
      if (token) {
        await resetPassword({
          token: token.trim(),
          password: password.trim(),
        });

        setPassword("");
        toast.success("Đặt lại mật khẩu thành công");
      } else {
        await sendResetPassword({
          email: email.trim(),
        });

        setEmail("");
        toast.success("Đã gửi thành công");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };
  return (
    <>
      <section className="my-[60px]">
        <div className="mx-auto max-w-[1230px] w-full px-[10px] sm:px-[15px]">
          <div className="flex items-center justify-center">
            <div className="max-w-sm w-full">
              <h2 className="uppercase mb-[20px] text-center text-black">
                Đặt lại mật khẩu
              </h2>
              <form className="space-y-[15px]" onSubmit={handleSubmit}>
                {token ? (
                  <>
                    <div className="space-y-[5px]">
                      <label
                        htmlFor=""
                        className="block   text-[0.9rem] font-medium"
                      >
                        Mật khẩu mới
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu mới"
                        className="text-[0.9rem] block w-full px-3 py-2 border border-gray-200"
                        required
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-[5px]">
                    <label
                      htmlFor=""
                      className="block text-[0.9rem] font-medium"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-[0.9rem] block w-full px-3 py-2 border border-gray-200"
                      placeholder="Nhập email"
                      required
                    />
                  </div>
                )}

                <div className="mt-4">
                  <Link
                    href="/login"
                    className="text-[0.9rem] text-blue-400 font-medium"
                  >
                    Quay lại
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white focus:outline-none font-semibold rounded-sm text-[0.9rem] px-5 py-2.5 text-center"
                >
                  {token ? "Đặt lại mật khẩu" : "Gửi mã xác nhận"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {(isLoadingSendResetPassword || isLoadingResetPassword) && (
        <Overplay IndexForZ={50}>
          <Loading height={0} size={55} color="white" thickness={8} />
          <h4 className="text-white">Vui lòng chờ trong giây lát...</h4>
        </Overplay>
      )}
    </>
  );
}

export default ResetPassword;
