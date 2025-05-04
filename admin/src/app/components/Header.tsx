"use client";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { LiaBell } from "react-icons/lia";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";
import Image from "./Image";
import Link from "next/link";

type HeaderProps = {
  toggleMenu: () => void;
};

function Header({ toggleMenu }: HeaderProps) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const toggleProfileMenu = () => {
    setProfileMenuOpen((prev) => !prev);
  };
  return (
    <>
      <header className="sticky top-0 z-20 flex w-full bg-white border-b-gray-200 items-center border-b">
        <div className="w-full flex justify-between items-center sm:px-[20px] py-3 px-[15px]">
          <button
            onClick={toggleMenu}
            className="w-9 h-9 rounded-lg border border-gray-200 text-gray-500 justify-center items-center flex"
          >
            <AiOutlineMenu size={20} />
          </button>

          <div className="flex gap-[20px] items-center">
            <button className="w-9 h-9 rounded-lg border border-gray-200 text-gray-500 justify-center items-center flex">
              <LiaBell size={21} />
            </button>

            <div
              className="flex cursor-pointer items-center gap-[6px] text-[0.9rem] relative0"
              onMouseOver={toggleProfileMenu}
              onMouseOut={toggleProfileMenu}
            >
              <Image
                Src={"assets/other/owner.png"}
                Alt={""}
                ClassName="w-[30px] rounded-full border border-gray-30 p-1"
                loadingType="eager"
              />
              QuangLam
              <div
                className={`absolute top-[50px] right-[15px] w-[170px] overflow-hidden z-20 transition-max-height duration-400 ease-in-out bg-white group-hover:max-h-[400px] shadow-md rounded-[6px] ${
                  profileMenuOpen ? "max-h-[400px]" : "max-h-0"
                }`}
              >
                <div>
                  <p className="text-[0.9rem] max-w-[160px] overflow-hidden text-ellipsis whitespace-nowrap text-center my-[15px] text-black px-[15px]">
                    Xin chào Quang Lam
                  </p>

                  <hr className="border-0 h-[1px] w-full bg-gray-300" />

                  <Link
                    href={"/account"}
                    className="w-full justify-left items-center py-[15px] hover:bg-[#F8F9FA] px-[15px]"
                  >
                    <div className="!flex items-center gap-[8px] text-[#878a99]">
                      <FaRegCircleUser size={18} />
                      <p className="text-[0.9rem]">Tài khoản</p>
                    </div>
                  </Link>

                  <button className="w-full justify-left py-[15px] hover:bg-[#F8F9FA] px-[15px]">
                    <div className="!flex items-center gap-[8px] text-[#EF5F5F]">
                      <RiLogoutBoxLine size={18} />
                      <p className="text-[0.9rem]">Đăng xuất</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
