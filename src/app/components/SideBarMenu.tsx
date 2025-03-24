"use client";
import React from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";
import { LuDoorOpen } from "react-icons/lu";
import { HiOutlineUser } from "react-icons/hi";
import { TbTruckDelivery } from "react-icons/tb";
function SideBarMenu() {
  return (
    <div className=" w-full xl:max-w-[320px] border-[1.5px] border-double border-gray-300 rounded-md">
      <div className="p-[25px_15px] sm:p-[30px_20px]">
        <Link href="/account">
          <div className="flex justify-between items-center p-[13px] text-[15px] border border-gray-300 my-[12px] text-[#262626]">
            <div className="flex items-center gap-2.5 text-[0.95rem]">
              <HiOutlineUser size={20} />
              <span>Thông tin toàn khoản</span>
            </div>
            <div>
              <FiChevronRight size={18} />
            </div>
          </div>
        </Link>

        <Link href="/address">
          <div className="flex justify-between items-center p-[13px] text-[15px] border border-gray-300 my-[12px] text-[#262626]">
            <div className="flex items-center gap-2.5 text-[0.95rem]">
              <TbTruckDelivery size={22} />
              <span>Địa chỉ giao hàng</span>
            </div>
            <div>
              <FiChevronRight size={18} />
            </div>
          </div>
        </Link>

        <Link href="/order">
          <div className="flex justify-between items-center p-[13px] text-[15px] border border-gray-300 my-[12px] text-[#262626]">
            <div className="flex items-center gap-2.5 text-[0.95rem]">
              <IoBagHandleOutline size={20} />
              <span>Đơn hàng của bạn</span>
            </div>
            <div>
              <FiChevronRight size={18} />
            </div>
          </div>
        </Link>

        <Link href="/">
          <div className="flex justify-between items-center p-[13px] text-[15px] border border-gray-300 my-[12px] text-[#262626]">
            <div className="flex items-center gap-2.5 text-[0.95rem]">
              <LuDoorOpen size={22} />
              <span>Đăng xuất</span>
            </div>
            <div>
              <FiChevronRight size={18} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SideBarMenu;
