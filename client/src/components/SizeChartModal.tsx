import React from "react";
import Overplay from "./Overplay";
import { HiMiniXMark } from "react-icons/hi2";

type props = {
  isOpen: boolean;
  toggleMenu: () => void;
};
function SizeChartModal({ isOpen, toggleMenu }: props) {
  return (
    <div className="flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-20 h-full">
      <div className="relative w-full max-w-lg max-h-full">
        <div className="relative p-[25px_15px] bg-white z-20">
          <div className="flex items-center justify-between">
            <h4 className="uppercase">Bảng kích thước</h4>

            <button
              type="button"
              className=" bg-transparent ms-auto"
              onClick={toggleMenu}
            >
              <HiMiniXMark size={25} />
            </button>
          </div>
        </div>

        {isOpen && <Overplay closeMenu={toggleMenu} IndexForZ={15} />}
      </div>
    </div>
  );
}

export default SizeChartModal;
