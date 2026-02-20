"use client";
import { useSendResetOTP } from "@/hooks/useSendResetOTP";
import { validateEmail } from "@/utils/validateEmail";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import Overplay from "./ui/Overplay";
import Loading from "./ui/Loading";
import { useRouter } from "next/navigation";
import { useResetPassword } from "@/hooks/useResetPassword";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";

function ResetPassword() {
  const router = useRouter();

  const { sendResetOTP, isLoading: isLoadingSendResetOTP } = useSendResetOTP();
  const { resetPassword, isLoading: isLoadingResetPassword } =
    useResetPassword();

  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState({
    email: "",
    otp: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (!validateEmail(data.email)) {
        toast.error("Email không hợp lệ");
        return;
      }

      if (data.email === process.env.EMAIL_USER) {
        toast.error("Email này không hoạt động!");
        return;
      }

      try {
        await sendResetOTP({ email: data.email.trim() });
        toast.success("Đã gửi OTP tới email");
        setStep(2);
      } catch (err: any) {
        toast.error(err?.response?.data?.msg);
      }
    } else {
      if (data.password.length < 6) {
        toast.error("Mật khẩu phải có ít nhất 6 ký tự");
        return;
      }
      try {
        await resetPassword({
          email: data.email.trim(),
          otp: data.otp.trim(),
          password: data.password.trim(),
        });
        toast.success("Đặt lại mật khẩu thành công");
        setData({
          email: "",
          password: "",
          otp: "",
        });
        router.replace("/login");
      } catch (err: any) {
        toast.error(err?.response?.data?.msg);
      }
    }
  };

  const handleSendOTP = async () => {
    await sendResetOTP({ email: data.email.trim() });
  };

  return (
    <>
      <section className="my-[60px] px-[15px]">
        <div className="mx-auto max-w-[1230px] w-full">
          <div className="flex items-center justify-center">
            <div className="max-w-sm w-full">
              <h2 className="uppercase mb-[20px] text-center text-black">
                Đặt lại mật khẩu
              </h2>

              <form className="space-y-[15px]" onSubmit={handleSubmit}>
                {step === 1 ? (
                  <div className="space-y-[5px]">
                    <label className="block text-[0.9rem] font-medium">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      className="text-[0.9rem] block w-full px-3 py-2 border border-gray-200"
                      placeholder="Nhập email"
                      required
                    />
                  </div>
                ) : (
                  <>
                    <div className="space-y-[5px]">
                      <div className="flex justify-between items-center">
                        <label className="block text-[0.9rem] font-medium">
                          Nhập mã OTP
                        </label>

                        <button
                          type="button"
                          className="text-[0.9rem] text-gray-500 p-0"
                          onClick={handleSendOTP}
                        >
                          Gửi lại mã
                        </button>
                      </div>

                      <input
                        type="text"
                        name="otp"
                        maxLength={6}
                        value={data.otp}
                        onChange={handleChange}
                        placeholder="Nhập mã OTP"
                        className="text-[0.9rem] block w-full px-3 py-2 border border-gray-200"
                        required
                      />
                    </div>

                    <div className="space-y-[5px]">
                      <label
                        htmlFor=""
                        className="block text-[0.9rem] font-medium"
                      >
                        Mật khẩu mới
                      </label>

                      <div className="relative">
                        <input
                          type={!showPassword ? "password" : "text"}
                          name="password"
                          value={data.password}
                          onChange={handleChange}
                          placeholder="Nhập mật khẩu mới"
                          className="text-[0.9rem] block w-full  px-3 pr-12 py-2 border border-gray-200"
                          required
                        />

                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={toggleShowPassword}
                        >
                          {!showPassword ? (
                            <HiOutlineEye size={22} />
                          ) : (
                            <HiOutlineEyeOff size={22} />
                          )}
                        </button>
                      </div>
                    </div>
                  </>
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
                  {step === 1 ? "Gửi mã xác nhận" : "Đặt lại mật khẩu"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {(isLoadingSendResetOTP || isLoadingResetPassword) && (
        <Overplay IndexForZ={50}>
          <Loading height={0} size={55} color="white" thickness={8} />
          <h4 className="text-white">Vui lòng chờ trong giây lát...</h4>
        </Overplay>
      )}
    </>
  );
}

export default ResetPassword;
