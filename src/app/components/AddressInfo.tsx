"use client";
import React, { useState } from "react";
import SideBarMenu from "./SideBarMenu";
import AddressModal from "./AddressModal";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
function AddressInfo() {
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const toggleAddressModal = () => {
    setOpenAddressModal(!openAddressModal);
  };
  return (
    <>
      <section className="w-full mt-[40px] sm:mt-[45px] ">
        <div className="px-[10px] flex justify-center flex-wrap gap-[15px] sm:px-[15px]">
          <SideBarMenu />

          <div className="w-full max-w-full border-[1.5px] border-double border-gray-300 lg:max-w-[700px] rounded-sm">
            <div className="p-[25px_15px] sm:p-[30px_20px]">
              <h2 className="text-[1.5rem] font-semibold mb-[15px]">Địa chỉ</h2>
              <div className="mb-[30px]">
                <button
                  onClick={toggleAddressModal}
                  type="button"
                  className="px-[14px] py-[8px] bg-red-600 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-red-700"
                >
                  Thêm địa chỉ
                </button>
              </div>

              <div>
                <hr className="border-slate-300 my-[20px]" />
                <div className="flex justify-between flex-wrap gap-y-[8px]">
                  <div className="flex flex-col gap-[8px] max-w-[360px]">
                    <div className="flex gap-[8px] items-center">
                      <span className="text-[0.9rem] flex gap-[5px] items-center text-[#6c757d]">
                        Họ và tên:
                        <p className="font-normal text-black">Quang Lam</p>
                      </span>
                      <span className="text-[#27AE60] font-normal text-[0.8rem] flex items-center gap-[4px]">
                        <IoIosCheckmarkCircleOutline />
                        Địa chỉ mặc định
                      </span>
                    </div>

                    <span className="text-[0.9rem] flex gap-[5px] items-center text-[#6c757d]">
                      Số điện thoại:
                      <p className="font-normal text-black">09757575xxx</p>
                    </span>
                    <span className="text-[0.9rem] flex gap-[5px] items-center text-[#6c757d]">
                      Địa chỉ:
                      <p className="font-normal text-black">
                        ABC, HWWW, Quận 6, Phường 6
                      </p>
                    </span>
                  </div>

                  <div className="flex gap-[25px]">
                    <button className="border-0 outline-0 text-[0.9rem] text-blue-500 font-medium">
                      Chỉnh sửa
                    </button>
                    <button className="border-0 outline-0 text-[0.9rem] text-red-500 font-medium">
                      Xóa
                    </button>
                  </div>
                </div>

                <hr className="border-slate-300 my-[20px]" />
                <div className="flex justify-between flex-wrap gap-y-[8px]">
                  <div className="flex flex-col gap-[8px] max-w-[360px]">
                    <div className="flex gap-[8px] items-center">
                      <span className="text-[0.9rem] flex gap-[5px] items-center text-[#6c757d]">
                        Họ và tên:
                        <p className="font-normal text-black">Quang Lam</p>
                      </span>
                      <span className="text-[#27AE60] font-normal text-[0.8rem] flex items-center gap-[4px]">
                        <IoIosCheckmarkCircleOutline />
                        Địa chỉ mặc định
                      </span>
                    </div>

                    <span className="text-[0.9rem] flex gap-[5px] items-center text-[#6c757d]">
                      Số điện thoại:
                      <p className="font-normal text-black">09757575xxx</p>
                    </span>
                    <span className="text-[0.9rem] flex gap-[5px] items-center text-[#6c757d]">
                      Địa chỉ:
                      <p className="font-normal text-black">
                        ABC, HWWW, Quận 6, Phường 6
                      </p>
                    </span>
                  </div>

                  <div className="flex gap-[25px]">
                    <button className="border-0 outline-0 text-[0.9rem] text-blue-500 font-medium">
                      Chỉnh sửa
                    </button>
                    <button className="border-0 outline-0 text-[0.9rem] text-red-500 font-medium">
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {openAddressModal && (
        <AddressModal
          toggleMenu={toggleAddressModal}
          isOpen={openAddressModal}
        />
      )}
    </>
  );
}

export default AddressInfo;
