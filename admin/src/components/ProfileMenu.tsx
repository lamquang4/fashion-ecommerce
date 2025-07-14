"use client";
import React from "react";
import Image from "./Image";
import Link from "next/link";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";
import useGetUser from "@/hooks/useGetUser";
type menuProps = {
  menuOpen: boolean;
  toggleMenu: () => void;
};
function ProfileMenu({ menuOpen, toggleMenu }: menuProps) {
  const { data: session } = useSession({
    required: true,
  });

  const { user, isLoading } = useGetUser(session?.user.id || "");
  return (
    <>
      {session?.user && (
        <div
          className="flex cursor-pointer items-center gap-[6px] text-[0.9rem] relative"
          onMouseOver={toggleMenu}
          onMouseOut={toggleMenu}
        >
          <Image
            Src={"/assets/other/owner.png"}
            Alt={""}
            ClassName="w-[30px] rounded-full border border-gray-30 p-1"
            loadingType="eager"
          />
          {user?.fullname || ""}
          {!isLoading && (
            <div
              className={`absolute top-[40px] right-[15px] w-[170px] overflow-hidden z-20 transition-max-height duration-400 ease-in-out bg-white group-hover:max-h-[400px] shadow-md rounded-[6px] ${
                menuOpen ? "max-h-[400px]" : "max-h-0"
              }`}
            >
              <div>
                <div className="px-3 py-3.5 border-b border-gray-300 w-full">
                  <p className=" text-[0.9rem] max-w-[160px] overflow-hidden text-ellipsis whitespace-nowrap text-center text-black">
                    Xin chào {user?.fullname || ""}
                  </p>
                </div>

                <Link
                  href={"/account"}
                  className="w-full justify-left items-center hover:bg-[#F8F9FA] px-3 py-3.5"
                >
                  <div className="!flex items-center gap-[8px] text-[#878a99]">
                    <FaRegCircleUser size={18} />
                    <p className="text-[0.9rem]">Tài khoản</p>
                  </div>
                </Link>

                <button
                  className="w-full justify-left hover:bg-[#F8F9FA] px-3 py-3.5"
                  onClick={() => signOut()}
                >
                  <div className="!flex items-center gap-[8px] text-[#EF5F5F]">
                    <RiLogoutBoxLine size={18} />
                    <p className="text-[0.9rem]">Đăng xuất</p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileMenu;
