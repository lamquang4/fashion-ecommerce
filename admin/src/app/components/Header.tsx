"use client";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { LiaBell } from "react-icons/lia";
import Image from "./Image";

type HeaderProps = {
  toggleMenu: () => void;
};

function Header({ toggleMenu }: HeaderProps) {
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

            <div className="flex cursor-pointer items-center gap-[10px] text-[0.9rem]">
              <Image
                Src={"assets/other/owner.png"}
                Alt={""}
                ClassName="w-[40px] rounded-full"
              />
              QuangLam
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
