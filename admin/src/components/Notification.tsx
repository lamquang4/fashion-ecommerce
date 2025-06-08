import React from "react";
import { LiaBell } from "react-icons/lia";
type menuProps = {
  menuOpen: boolean;
  toggleMenu: () => void;
};
function Notification({ menuOpen, toggleMenu }: menuProps) {
  return (
    <div
      className="flex cursor-pointer items-center gap-[6px] text-[0.9rem] relative"
      onMouseOver={toggleMenu}
      onMouseOut={toggleMenu}
    >
      <button className="w-9 h-9 rounded-lg border border-gray-200 text-gray-500 justify-center items-center flex relative">
        <LiaBell size={21} />
      </button>

      <div
        className={`absolute top-[40px] right-0 w-[200px] overflow-hidden z-20 transition-max-height duration-400 ease-in-out bg-white group-hover:max-h-[400px] shadow-md rounded-[6px] ${
          menuOpen ? "max-h-[400px]" : "max-h-0"
        }`}
      >
        <div className="sticky top-0 px-3 py-3.5 border-b border-gray-300">
          <h2 className="text-[0.9rem] font-semibold">Thông báo</h2>
        </div>
        <div className="h-full max-h-[400px] overflow-y-auto">
          <div className="px-3 py-2.5">
            <div>
              <span className="text-[0.9rem]">
                Khách hàng <span className="font-semibold">quanglam</span>
              </span>
              <p>đã đặt chiếc áo sơ mi BC</p>
            </div>
            <small className="text-[#22BAA0]">1 phút trước</small>
          </div>

          <div className="px-3 py-2.5">
            <div>
              <span className="text-[0.9rem]">
                Khách hàng <span className="font-semibold">quanglam</span>
              </span>
              <p>đã đặt chiếc áo sơ mi BC</p>
            </div>
            <small className="text-[#22BAA0]">1 phút trước</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
