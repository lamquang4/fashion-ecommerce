"use client";
import React, { useState } from "react";
import SideBarMenu from "./SideBarMenu";

function AccountInfo() {
  const [data, setData] = useState({
    fullname: "quang lam",
    email: "lamdieuquang0105@gmail.com",
    phone: "08974563477",
    birthday: "2004-05-04",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <section className="w-full mt-[30px] sm:mt-[45px] ">
      <div className="px-[10px] flex justify-center flex-wrap gap-[15px] sm:px-[15px]">
        <SideBarMenu />

        <div className="w-full border-[1.5px] border-double border-gray-300 md:w-[700px] rounded-md">
          <form action="" className="p-[30px_15px] md:p-[30px_20px]">
            <h2 className="text-[1.5rem] font-bold mb-[25px]">Tài khoản</h2>
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
                  type="text"
                  name="phone"
                  className="w-full rounded-[5px] p-[6px_10px] text-[0.9rem] border border-gray-300 mt-[5px] not-last:mb-[15px]"
                  maxLength={12}
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
                className="px-[14px] py-[10px] bg-blue-500 text-white text-[0.9rem] text-center rounded-md hover:bg-blue-400"
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
