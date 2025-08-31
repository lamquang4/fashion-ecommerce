"use client";
import useGetUser from "@/hooks/useGetUser";
import useUpdateUser from "@/hooks/useUpdateUser";
import { validateEmail } from "@/utils/validateEmail";
import { validatePhone } from "@/utils/validatePhone";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function EditCustomer() {
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
  });
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { user, mutate, isLoading } = useGetUser(id);
  const { updateUser, isLoading: isLoadingUpdateUser } = useUpdateUser(id);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
  };

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      toast.error("Không tìm thấy khách hàng");
      router.push("/customer");
      return;
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      setData({
        fullname: user.fullname || "",
        email: user.email || "",
        phone: user.phone || "",
        birthday: user.birthday?.slice(0, 10) || "",
        password: "",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(data.email.trim())) {
      toast.error("Email không hợp lệ");
      mutate(undefined, true);
      return;
    }
    if (!validatePhone(data.phone.trim())) {
      toast.error("Số điện thoại không hợp lệ");
      mutate(undefined, true);
      return;
    }
    try {
      await updateUser({
        fullname: data.fullname.trim(),
        email: data.email.toLowerCase().trim(),
        phone: data.phone.trim(),
        birthday: data.birthday,
        password: data.password.trim(),
      });

      setData((prev) => ({
        ...prev,
        password: "",
      }));
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-full">
      <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
        <h2 className="text-[#74767d]">Chỉnh sửa khách hàng</h2>

        <div className="flex gap-[25px] w-full flex-col">
          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
            <h5 className="font-bold text-[#74767d]">
              Thông tin chung
            </h5>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem] font-medium">
                Họ tên
              </label>
              <input
                type="text"
                name="fullname"
                required
                value={data.fullname}
                onChange={handleChange}
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem] font-medium">
                Email
              </label>
              <input
                type="text"
                name="email"
                required
                value={data.email}
                onChange={handleChange}
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
              />
            </div>

            <div className="flex flex-wrap md:flex-nowrap gap-[15px]">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="" className="text-[0.9rem] font-medium">
                  Số điện thoại
                </label>
                <input
                  type="number"
                  name="phone"
                  inputMode="numeric"
                  value={data.phone}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="" className="text-[0.9rem] font-medium">
                  Sinh nhật
                </label>
                <input
                  type="date"
                  name="birthday"
                  required
                  value={data.birthday}
                  onChange={handleChange}
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem] font-medium">
                Mật khẩu mới
              </label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <button
            type="submit"
            className="p-[6px_10px] bg-teal-500 text-white text-[0.9rem] font-medium text-center hover:bg-teal-600 rounded-sm"
          >
            {isLoadingUpdateUser ? "Đang cập nhật..." : "Cập nhật"}
          </button>
          <Link
            href="/customer"
            className="p-[6px_10px] bg-red-500 text-white text-[0.9rem] text-center hover:bg-red-600 rounded-sm"
          >
            Trở về
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditCustomer;
