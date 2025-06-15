"use client";
import useGetUser from "@/hooks/useGetUser";
import useUpdateUser from "@/hooks/useUpdateUser";
import { validateEmail } from "@/utils/validateEmail";
import { validatePhone } from "@/utils/validatePhone";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function EditAdmin() {
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    role: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const user = useGetUser(id);

  useEffect(() => {
    if (user) {
      setData({
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        birthday: user.birthday?.slice(0, 10),
        password: "",
        role: String(user.role),
      });
    } else if (id && !user) {
      const timeout = setTimeout(() => {
        toast.error("Không tìm thấy quản trị viên");
        router.push("/admin");
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [user, router, id]);

  const { updateUser } = useUpdateUser(id);

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
      await updateUser({
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
        birthday: data.birthday,
        password: data.password,
        role: Number(data.role),
      });
      toast.success("Cập nhật thành công!");
      setData((prev) => ({
        ...prev,
        password: "",
      }));
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-full">
      <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
        <h1 className="font-bold text-[1.5rem] text-[#74767d]">
          Chỉnh sửa quản trị viên
        </h1>

        <div className="flex gap-[25px] w-full flex-col">
          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
            <p className="font-bold text-[1rem] text-[#74767d]">
              Thông tin chung
            </p>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem] text-black">
                Họ tên
              </label>
              <input
                type="text"
                name="fullname"
                required
                value={data.fullname}
                onChange={handleChange}
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem] text-black">
                Email
              </label>
              <input
                type="text"
                name="email"
                required
                value={data.email}
                onChange={handleChange}
                className="lowercase border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
            </div>

            <div className="flex flex-wrap md:flex-nowrap gap-[15px]">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="" className="text-[0.9rem] text-black">
                  Số điện thoại
                </label>
                <input
                  type="number"
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="" className="text-[0.9rem] text-black">
                  Sinh nhật
                </label>
                <input
                  type="date"
                  name="birthday"
                  required
                  value={data.birthday}
                  onChange={handleChange}
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem] text-black">
                Chức vụ
              </label>
              <select
                name="role"
                required
                value={data.role}
                onChange={handleChange}
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              >
                <option value="">Chọn chức vụ</option>
                <option value="0">Siêu quản trị viên</option>
                <option value="1">Nhân viên bán hàng</option>
                <option value="2">Nhân viên nội dung</option>
                <option value="3">Kế toán</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem] text-black">
                Mật khẩu mới
              </label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <button
            type="submit"
            className="p-[6px_10px] bg-teal-500 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-teal-600"
          >
            Cập nhật
          </button>
          <Link
            href="/admin"
            className="p-[6px_10px] bg-red-500 text-white text-[0.9rem] text-center rounded-sm"
          >
            Trở về
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditAdmin;
