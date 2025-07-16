"use client";
import React, { useEffect, useState } from "react";
import SideBarMenu from "./SideBarMenu";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { validateEmail } from "@/utils/validateEmail";
import { validatePhone } from "@/utils/validatePhone";
import useUpdateCustomer from "@/hooks/useUpdateCustomer";
import useGetCustomer from "@/hooks/useGetCustomer";

function AccountInfo() {
  const [data, setData] = useState({
    fullname: "",
    email: "",
    phone: "",
    birthday: "",
  });

  const { data: session } = useSession();

  const { updateCustomer } = useUpdateCustomer(session?.user.id || "");

  const { customer, mutate } = useGetCustomer(session?.user.id || "");

  useEffect(() => {
    setData({
      fullname: customer?.fullname || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
      birthday: customer?.birthday?.slice(0, 10) || "",
    });
  }, [customer]);

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
    if (!validateEmail(data.email.trim())) {
      toast.error("Email không hợp lệ");
      return;
    }
    if (!validatePhone(data.phone.trim())) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }
    try {
      await updateCustomer({
        fullname: data.fullname.trim(),
        email: data.email.toLowerCase().trim(),
        phone: data.phone,
        birthday: data.birthday,
      });
      toast.success("Cập nhật thành công!");
      mutate();
      setData((prev) => ({
        ...prev,
        password: "",
      }));
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <section className="w-full mt-[40px] sm:mt-[45px] ">
      <div className="px-[10px] flex justify-center flex-wrap sm:px-[15px]">
        <SideBarMenu />

        <div className="w-full max-w-full border border-gray-300 lg:max-w-[700px]">
          <form
            action=""
            className="p-[25px_15px] sm:p-[30px_20px]"
            onSubmit={handleSubmit}
          >
            <h2 className="text-[1.5rem] font-semibold mb-[25px]">Tài khoản</h2>
            <div className="mb-[25px]">
              <div className="w-full">
                <span className="block text-left text-[0.9rem]">
                  Họ và tên:
                </span>
                <input
                  type="text"
                  name="fullname"
                  className="w-full rounded-[5px] p-[6px_10px] text-[0.9rem] border border-gray-300 mt-[5px] not-last:mb-[15px]"
                  value={data.fullname}
                  onChange={handleChange}
                />

                <span className="block text-left text-[0.9rem]">Email:</span>
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-[5px] p-[6px_10px] text-[0.9rem] border border-gray-300 mt-[5px] not-last:mb-[15px]"
                  value={data.email}
                  onChange={handleChange}
                />

                <span className="block text-left text-[0.9rem]">Phone:</span>
                <input
                  type="number"
                  name="phone"
                  inputMode="numeric"
                  className="w-full rounded-[5px] p-[6px_10px] text-[0.9rem] border border-gray-300 mt-[5px] not-last:mb-[15px]"
                  value={data.phone}
                  onChange={handleChange}
                />

                <span className="block text-left text-[0.9rem]">
                  Sinh nhật:
                </span>
                <input
                  type="date"
                  name="birthday"
                  className="w-full rounded-[5px] p-[6px_10px] text-[0.9rem] border border-gray-300 mt-[5px] not-last:mb-[15px]"
                  value={data.birthday}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-center gap-[10px] mt-[40px]">
              <button
                type="submit"
                name="submit"
                className="px-[10px] py-[6px] bg-blue-500 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-blue-400"
              >
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AccountInfo;
