"use client";
import Link from "next/link";
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
    if (data.password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");
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
    <section className="my-[60px] px-[10px] sm:px-[15px]">
      <div className="flex items-center justify-center">
        <div className="w-full bg-white md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="uppercase mb-[20px] text-center text-black">
              Đăng kí
            </h2>
            <form className="space-y-[15px]" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor=""
                  className="block mb-2 text-[0.9rem] font-medium"
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

              <div>
                <label
                  htmlFor=""
                  className="block mb-2 text-[0.9rem] font-medium"
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

              <div>
                <label
                  htmlFor=""
                  className="block mb-2 text-[0.9rem] font-medium"
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

              <div>
                <label
                  htmlFor=""
                  className="block mb-2 text-[0.9rem] font-medium"
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

              <div>
                <label
                  htmlFor=""
                  className="block mb-2 text-[0.9rem] font-medium"
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu"
                  className="text-[0.9rem] block w-full px-3 py-2 border border-gray-200"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white focus:outline-none font-semibold rounded-sm text-[1rem] px-5 py-2.5 text-center"
              >
                Đăng kí
              </button>

              <p className="flex gap-1.5 justify-center font-medium">
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
