"use client";
import React, { useEffect, useState } from "react";
import SideBarMenu from "./SideBarMenu";
import { useSession } from "next-auth/react";

function AccountInfo() {
  const { data: session } = useSession();

  return (
    <section className="w-full mt-[40px] sm:mt-[45px] ">
      <div className="flex justify-center flex-wrap">
        <SideBarMenu />

        <div className="w-full max-w-full border border-gray-300 lg:max-w-[700px]">
          <form action="" className="p-[25px_15px]">
            <h2 className="text-[1.5rem] font-semibold mb-[25px]">Tài khoản</h2>
            <div className="mb-[25px]">
              <div className="w-full">
                <span className="block text-left text-[0.9rem]">
                  Họ và tên:
                </span>
                <input
                  type="text"
                  name="fullname"
                  className="w-full rounded-[5px] p-[6px_10px] text-[0.9rem] border border-gray-300 mt-[5px] not-last:mb-[15px] focus:outline-0"
                  value={session?.user.fullname}
                  readOnly
                />

                <span className="block text-left text-[0.9rem]">Email:</span>
                <input
                  type="text"
                  name="email"
                  className="w-full rounded-[5px] p-[6px_10px] text-[0.9rem] border border-gray-300 mt-[5px] not-last:mb-[15px] focus:outline-0"
                  value={session?.user.email}
                  readOnly
                />

                <span className="block text-left text-[0.9rem]">Phone:</span>
                <input
                  type="number"
                  name="phone"
                  inputMode="numeric"
                  className="w-full rounded-[5px] p-[6px_10px] text-[0.9rem] border border-gray-300 mt-[5px] not-last:mb-[15px] focus:outline-0"
                  value={session?.user.phone}
                  readOnly
                />

                <span className="block text-left text-[0.9rem]">
                  Sinh nhật:
                </span>
                <input
                  type="date"
                  name="birthday"
                  className="w-full rounded-[5px] p-[6px_10px] text-[0.9rem] border border-gray-300 mt-[5px] not-last:mb-[15px] focus:outline-0"
                  value={session?.user.birthday}
                  readOnly
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AccountInfo;
