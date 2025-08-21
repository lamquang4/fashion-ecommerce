"use client";
import React, { memo } from "react";
import Image from "./Image";
import Link from "next/link";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";

type menuProps = {
  menuOpen: boolean;
  toggleMenu: () => void;
};
function ProfileMenu({ menuOpen, toggleMenu }: menuProps) {
  const { data: session } = useSession({
    required: true,
  });

  return (
    <>
      {session?.user && (
        <div
          className=" text-[0.9rem] relative"
          onMouseOver={toggleMenu}
          onMouseOut={toggleMenu}
        >
          <div className="flex cursor-pointer items-center gap-[6px] text-[0.9rem]">
            <div className="w-[30px] rounded-full border border-gray-300 p-1">
              <Image
                Src={"/assets/other/owner.png"}
                Alt={""}
                ClassName="w-full"
                loadingType="eager"
              />
            </div>
            <p>{session?.user.fullname || ""}</p>
          </div>

          {menuOpen && (
            <div className="w-[185px] absolute top-full right-0 overflow-hidden z-20 duration-400 ease-in-out bg-white shadow-md rounded-md border border-gray-200 ">
              <h2 className="cursor-pointer border-b px-3 py-3.5 border-gray-300 text-[0.95rem] max-w-[210px] overflow-hidden text-ellipsis whitespace-nowrap text-center">
                Xin chào, {session?.user?.fullname}
              </h2>

              <Link
                onClick={toggleMenu}
                href={"/account"}
                className="w-ful block hover:bg-[#F8F9FA] px-3 py-3.5"
              >
                <div className="flex items-center gap-[8px] text-[#878a99]">
                  <FaRegCircleUser size={18} />
                  <p className="text-[0.9rem]">Tài khoản</p>
                </div>
              </Link>

              <button
                className="w-full block hover:bg-[#F8F9FA] px-3 py-3.5"
                onClick={() => {
                  signOut();
                  toggleMenu;
                }}
              >
                <div className="flex items-center gap-[8px] text-[#EF5F5F]">
                  <RiLogoutBoxLine size={18} />
                  <p className="text-[0.9rem]">Đăng xuất</p>
                </div>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default memo(ProfileMenu);
