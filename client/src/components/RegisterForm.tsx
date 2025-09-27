"use client";
import Link from "next/link";
import { useState } from "react";
import { validateEmail } from "@/utils/validateEmail";
import { validatePhone } from "@/utils/validatePhone";
import toast from "react-hot-toast";
import useRegister from "@/hooks/useRegister";
import Overplay from "./Overplay";
import Loading from "./Loading";
import { validateBirthday } from "@/utils/validateBirthday";
import { useSendRegisterOTP } from "@/hooks/useSendRegisterOTP";
import { useRouter } from "next/navigation";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
function RegisterForm() {
  const router = useRouter();

  const { handleRegister, isLoading } = useRegister();
  const { sendRegisterOTP, isLoading: isLoadingSendResetOTP } =
    useSendRegisterOTP();

  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    birthday: "",
    phone: "",
    otp: "",
  });
  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

      try {
        await sendRegisterOTP({ email: data.email.trim() });
        setStep(2);
      } catch (err: any) {
        toast.error(err?.response?.data?.msg);
      }
    } else {
      if (!validatePhone(data.phone)) {
        toast.error("Số điện thoại không hợp lệ");
        return;
      }
      if (!validateBirthday(data.birthday)) {
        toast.error("Bạn phải đủ 18 tuổi trở lên");
        return;
      }
      if (data.password.length < 6) {
        toast.error("Mật khẩu phải có ít nhất 6 ký tự");
        return;
      }
      try {
        await handleRegister({
          fullname: data.fullname.trim(),
          email: data.email.toLowerCase().trim(),
          phone: data.phone.trim(),
          birthday: data.birthday,
          password: data.password.trim(),
          otp: data.otp.trim(),
        });
        toast.success("Đăng kí thành công!");
        setData({
          fullname: "",
          email: "",
          password: "",
          phone: "",
          birthday: "",
          otp: "",
        });
        router.replace("/login");
      } catch (err: any) {
        toast.error(err?.response?.data?.msg);
      }
    }
  };

  const handleSendOTP = async () => {
    await sendRegisterOTP({ email: data.email.trim() });
  };
  return (
    <>
      <section className="my-[60px] px-[15px]">
        <div className="mx-auto max-w-[1230px] w-full">
          <div className="flex items-center justify-center">
            <div className="max-w-sm w-full">
              <h2 className="uppercase mb-[20px] text-center text-black">
                Đăng kí
              </h2>
              <form className="space-y-[15px]" onSubmit={handleSubmit}>
                {step === 1 ? (
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
                          onClick={handleSendOTP}
                          className="text-[0.9rem] text-gray-500 p-0"
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
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        name="fullname"
                        value={data.fullname}
                        onChange={handleChange}
                        className="text-[0.9rem] block w-full px-3 py-2 border border-gray-200"
                        placeholder="Nhập họ và tên"
                        required
                      />
                    </div>

                    <div className="space-y-[5px]">
                      <label
                        htmlFor=""
                        className="block text-[0.9rem] font-medium"
                      >
                        Số điện thoại
                      </label>
                      <input
                        type="number"
                        name="phone"
                        inputMode="numeric"
                        value={data.phone}
                        onChange={handleChange}
                        className="text-[0.9rem] block w-full px-3 py-2 border border-gray-200"
                        placeholder="Nhập số điện thoại"
                        required
                      />
                    </div>

                    <div className="space-y-[5px]">
                      <label
                        htmlFor=""
                        className="block text-[0.9rem] font-medium"
                      >
                        Sinh nhật
                      </label>
                      <input
                        type="date"
                        name="birthday"
                        value={data.birthday}
                        onChange={handleChange}
                        className="text-[0.9rem] block w-full px-3 py-2 border border-gray-200"
                        placeholder="Nhập số điện thoại"
                        required
                      />
                    </div>

                    <div className="space-y-[5px]">
                      <label
                        htmlFor=""
                        className="block text-[0.9rem] font-medium"
                      >
                        Mật khẩu
                      </label>

                      <div className="relative">
                        <input
                          type={!showPassword ? "password" : "text"}
                          name="password"
                          value={data.password}
                          onChange={handleChange}
                          placeholder="Nhập mật khẩu"
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

                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setStep(1);
                          setData({
                            fullname: "",
                            email: "",
                            password: "",
                            phone: "",
                            birthday: "",
                            otp: "",
                          });
                        }}
                        className="text-[0.9rem] text-blue-400 font-medium"
                      >
                        Trở về
                      </button>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full bg-black text-white focus:outline-none font-semibold rounded-sm text-[0.9rem] px-5 py-2.5 text-center"
                >
                  Đăng kí
                </button>

                <p className="flex gap-1.5 justify-center font-medium">
                  Bạn đã có tài khoản?
                  <Link href="/login" className="text-blue-400 font-medium">
                    Đăng nhập
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {(isLoading || isLoadingSendResetOTP) && (
        <Overplay IndexForZ={50}>
          <Loading height={0} size={55} color="white" thickness={8} />
          <h4 className="text-white">Vui lòng chờ trong giây lát...</h4>
        </Overplay>
      )}
    </>
  );
}

export default RegisterForm;
