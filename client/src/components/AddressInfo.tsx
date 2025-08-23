"use client";
import React, { useEffect, useState } from "react";
import SideBarMenu from "./SideBarMenu";
import AddressModal from "./AddressModal";
import useGetAddresses from "@/hooks/useGetAddresses";
import useDeleteAddress from "@/hooks/useDeleteAddress";
import toast from "react-hot-toast";
import Loading from "./Loading";
import Image from "./Image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
function AddressInfo() {
  const { status } = useSession();
  const router = useRouter();

  const [addressId, setAddressId] = useState<string>("");
  const [openAddressModal, setOpenAddressModal] = useState<boolean>(false);

  const { addresses, isLoading, mutate } = useGetAddresses();
  const { deleteAddress, isLoading: isLoadingDeleteAddress } =
    useDeleteAddress();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

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
      mutate();
    }
  };

  return (
    <section className="w-full my-[40px]">
      <div className="flex justify-center flex-wrap gap-8">
        <SideBarMenu />

        <div className="w-full max-w-full lg:max-w-[700px] px-[15px]">
          <div className="space-y-[20px]">
            <h2 className="capitalize">Địa chỉ</h2>

            <button
              onClick={toggleAddressModal}
              type="button"
              className="px-[10px] py-[6px] bg-red-600 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-red-700"
            >
              Thêm địa chỉ
            </button>

            <div>
              {isLoading ? (
                <Loading height={70} size={50} color="black" thickness={3} />
              ) : addresses.length > 0 ? (
                addresses.map((address) => (
                  <div key={address._id}>
                    <hr className="border-gray-300 my-[20px]" />
                    <div className="flex justify-between flex-wrap gap-y-[8px]">
                      <div className="flex flex-col gap-[8px] max-w-[360px]">
                        <div className="flex gap-[8px] items-center">
                          <span className="flex gap-[5px] items-center text-[#6c757d]">
                            Họ và tên:
                            <span className="font-medium text-black">
                              {address.fullname}
                            </span>
                          </span>
                        </div>

                        <span className="flex gap-[5px] items-center text-[#6c757d]">
                          Số điện thoại:
                          <span className="font-medium text-black">
                            {address.phone}
                          </span>
                        </span>

                        <span className="flex gap-[5px] items-center text-[#6c757d]">
                          Địa chỉ:
                          <p className="font-medium text-black">
                            {address.speaddress}, {address.city}, {address.ward}
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
                          disabled={isLoadingDeleteAddress}
                          onClick={() => handleDelete(address._id || "")}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center h-[70vh]">
                  <div className="flex flex-col justify-center items-center gap-[15px]">
                    <Image
                      Src={"/assets/other/address.png"}
                      Alt={""}
                      ClassName={"w-[80px]"}
                      loadingType="eager"
                    />

                    <h4 className="text-gray-600">Không có địa chỉ nào</h4>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {openAddressModal && (
        <AddressModal
          addressId={addressId}
          toggleMenu={toggleAddressModal}
          isOpen={openAddressModal}
        />
      )}
    </section>
  );
}

export default AddressInfo;
