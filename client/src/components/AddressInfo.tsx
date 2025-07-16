"use client";
import React, { useState } from "react";
import SideBarMenu from "./SideBarMenu";
import AddressModal from "./AddressModal";
import { useSession } from "next-auth/react";
import useGetAddresses from "@/hooks/useGetAddresses";
import useDeleteAddress from "@/hooks/useDeleteAddress";
import toast from "react-hot-toast";
import Loading from "./Loading";
function AddressInfo() {
  const [addressId, setAddressId] = useState<string>("");
  const [openAddressModal, setOpenAddressModal] = useState<boolean>(false);
  const { data: session } = useSession();
  const { addresses, isLoading, mutate } = useGetAddresses(
    session?.user.id || ""
  );
  const { deleteAddress } = useDeleteAddress();
  const toggleAddressModal = () => {
    setOpenAddressModal((prev) => !prev);
    setAddressId("");
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }

    if (addresses.length === 1) {
      toast.error("Bạn cần giữ lại ít nhất một địa chỉ cho tài khoản");
      return;
    }

    try {
      await deleteAddress(id);
      toast.success("Xóa địa chỉ thành công");
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <>
      <section className="w-full mt-[40px] sm:mt-[45px] ">
        <div className="px-[10px] flex justify-center flex-wrap sm:px-[15px]">
          <SideBarMenu />

          <div className="w-full max-w-full border border-gray-300 lg:max-w-[700px]">
            <div className="p-[25px_15px] sm:p-[30px_20px]">
              <h2 className="text-[1.5rem] font-semibold mb-[15px]">Địa chỉ</h2>
              <div className="mb-[30px]">
                <button
                  onClick={toggleAddressModal}
                  type="button"
                  className="px-[10px] py-[6px] bg-red-600 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-red-700"
                >
                  Thêm địa chỉ
                </button>
              </div>

              <div>
                {isLoading ? (
                  <Loading height={40} />
                ) : (
                  addresses.map((address, index) => (
                    <div key={index}>
                      <hr className="border-gray-300 my-[20px]" />
                      <div className="flex justify-between flex-wrap gap-y-[8px]">
                        <div className="flex flex-col gap-[8px] max-w-[360px]">
                          <div className="flex gap-[8px] items-center">
                            <span className="text-[0.9rem] flex gap-[5px] items-center text-[#6c757d]">
                              Họ và tên:
                              <p className="font-normal text-black">
                                {address.fullname}
                              </p>
                            </span>
                          </div>

                          <span className="text-[0.9rem] flex gap-[5px] items-center text-[#6c757d]">
                            Số điện thoại:
                            <p className="font-normal text-black">
                              {address.phone}
                            </p>
                          </span>
                          <span className="text-[0.9rem] flex gap-[5px] items-center text-[#6c757d]">
                            Địa chỉ:
                            <p className="font-normal text-black">
                              {address.speaddress}, {address.city},{" "}
                              {address.ward}
                            </p>
                          </span>
                        </div>

                        <div className="flex gap-[25px] items-center">
                          <button
                            className="border-0 p-1 outline-0 text-[0.9rem] text-blue-500 font-medium"
                            type="button"
                            onClick={() => {
                              toggleAddressModal();
                              setAddressId(address._id || "");
                            }}
                          >
                            Chỉnh sửa
                          </button>
                          <button
                            className="border-0 p-1 outline-0 text-[0.9rem] text-red-500 font-medium"
                            type="button"
                            onClick={() => handleDelete(address._id || "")}
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {openAddressModal && (
        <AddressModal
          addressId={addressId}
          toggleMenu={toggleAddressModal}
          isOpen={openAddressModal}
        />
      )}
    </>
  );
}

export default AddressInfo;
