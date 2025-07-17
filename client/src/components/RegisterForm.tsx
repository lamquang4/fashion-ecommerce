"use client";
import Link from "next/link";
import DifferentLR from "./DifferentLR";
import { useState } from "react";
import { validateEmail } from "@/utils/validateEmail";
import { validatePhone } from "@/utils/validatePhone";
import toast from "react-hot-toast";
import useRegister from "@/hooks/useAddCustomer";

function RegisterForm() {
  const { addCustomer } = useRegister();
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    birthday: "",
    phone: "",
  });

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
    if (!validateEmail(data.email)) {
      toast.error("Email không hợp lệ");
      return;
    }
    if (!validatePhone(data.phone)) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }
    try {
      await addCustomer({
        fullname: data.fullname.trim(),
        email: data.email.toLowerCase().trim(),
        phone: data.phone.trim(),
        birthday: data.birthday,
        password: data.password.trim(),
      });
      toast.success("Đăng kí thành công!");
      setData({
        fullname: "",
        email: "",
        password: "",
        phone: "",
        birthday: "",
      });
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };
  return (
    <section className="mt-[30px] sm:mt-[45px]">
      <div className="flex flex-col items-center justify-center  px-[10px] sm:px-[15px]">
        <div className="w-full bg-white md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-[1.5rem] sm:text-[1.7rem] uppercase font-[550] mb-[20px] text-center text-black">
              Đăng kí
            </h2>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className="mb-[15px]">
                <label
                  htmlFor=""
                  className="block mb-2 text-[0.9rem] font-medium text-gray-900 dark:text-white"
                >
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={data.fullname}
                  onChange={handleChange}
                  className="text-[0.9rem] block w-full px-3 py-2 border border-[#e5e5e5] text-[#243238]"
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>
              <div className="mb-[15px]">
                <label
                  htmlFor=""
                  className="block mb-2 text-[0.9rem] font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="text-[0.9rem] block w-full px-3 py-2 border border-[#e5e5e5] text-[#243238]"
                  placeholder="Nhập email"
                  required
                />
              </div>
              <div className="mb-[15px]">
                <label
                  htmlFor=""
                  className="block mb-2 text-[0.9rem] font-medium text-gray-900 dark:text-white"
                >
                  Số điện thoại
                </label>
                <input
                  type="number"
                  name="phone"
                  inputMode="numeric"
                  value={data.phone}
                  onChange={handleChange}
                  className="text-[0.9rem] block w-full px-3 py-2 border border-[#e5e5e5] text-[#243238]"
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>
              <div className="mb-[15px]">
                <label
                  htmlFor=""
                  className="block mb-2 text-[0.9rem] font-medium text-gray-900 dark:text-white"
                >
                  Sinh nhật
                </label>
                <input
                  type="date"
                  name="birthday"
                  value={data.birthday}
                  onChange={handleChange}
                  className="text-[0.9rem] block w-full px-3 py-2 border border-[#e5e5e5] text-[#243238]"
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>
              <div className="mb-[15px]">
                <label
                  htmlFor=""
                  className="block mb-2 text-[0.9rem] font-medium text-gray-900 dark:text-white"
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu"
                  className="text-[0.9rem] block w-full px-3 py-2 border border-[#e5e5e5] text-[#243238]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Đăng kí
              </button>
              <p className="flex gap-1.5 justify-center font-light text-[0.9rem]">
                Bạn đã có tài khoản?
                <Link href="/login" className="text-blue-400 font-medium">
                  Đăng nhập
                </Link>
              </p>

              {/*
              <DifferentLR title={"đăng kí"} />
  */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterForm;
