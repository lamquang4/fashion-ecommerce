"use client";
import useAddAdmin from "@/hooks/useAddAdmin";
import { validateBirthday } from "@/utils/validateBirthday";
import { validateEmail } from "@/utils/validateEmail";
import { validatePhone } from "@/utils/validatePhone";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

function AddAdminForm() {
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    role: "",
  });

  const { addAdmin, isLoading } = useAddAdmin();

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
    if (!validateEmail(data.email.trim())) {
      toast.error("Email không hợp lệ");
      return;
    }
    if (!validatePhone(data.phone.trim())) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }
    if (!validateBirthday(data.birthday)) {
      toast.error("Bạn phải đủ 18 tuổi trở lên");
      return;
    }
    if (data.password.trim().length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
    try {
      await addAdmin({
        fullname: data.fullname.trim(),
        email: data.email.toLowerCase().trim(),
        phone: data.phone.trim(),
        birthday: data.birthday,
        password: data.password.trim(),
        role: parseInt(data.role),
      });

      setData({
        fullname: "",
        email: "",
        password: "",
        phone: "",
        birthday: "",
        role: "",
      });
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
      <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
        <h2 className=" text-[#74767d]">Thêm quản trị viên</h2>

        <div className="flex gap-[25px] w-full flex-col">
          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
            <h5 className="font-bold text-[#74767d]">Thông tin chung</h5>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem] font-medium">
                Họ tên
              </label>
              <input
                type="text"
                name="fullname"
                value={data.fullname}
                onChange={handleChange}
                required
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
                value={data.email}
                onChange={handleChange}
                required
                className="lowercase border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
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
                  value={data.birthday}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem] font-medium">
                Chức vụ
              </label>
              <select
                name="role"
                value={data.role}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
              >
                <option value="">Chọn chức vụ</option>
                <option value="0">Quản trị viên</option>
                <option value="1">Nhân viên bán hàng</option>
                <option value="2">Nhân viên nội dung</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem] font-medium">
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <button
            disabled={isLoading}
            type="submit"
            className="p-[6px_10px] bg-teal-500 text-white text-[0.9rem] font-medium text-center hover:bg-teal-600 rounded-sm"
          >
            {isLoading ? "Đang thêm..." : "Thêm"}
          </button>
          <Link
            href="/admin"
            className="p-[6px_10px] bg-red-500 text-white text-[0.9rem] text-center hover:bg-red-600 rounded-sm"
          >
            Trở về
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddAdminForm;
