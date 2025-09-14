"use client";
import { useEffect, useState } from "react";
import SideBarMenu from "./SideBarMenu";
import AddressModal from "./AddressModal";
import useGetAddresses from "@/hooks/useGetAddresses";
import useDeleteAddress from "@/hooks/useDeleteAddress";
import toast from "react-hot-toast";
import Loading from "./Loading";
import Image from "./Image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useGetAddress from "@/hooks/useGetAddress";
import useGetProvinces from "@/hooks/useGetProvinceVN";
function AddressInfo() {
  const { status } = useSession();
  const router = useRouter();

  const [addressId, setAddressId] = useState<string>("");
  const [openAddressModal, setOpenAddressModal] = useState<boolean>(false);

  const { isLoading: isLoadingAddress } = useGetAddress(addressId);
  const { provinces, isLoading: isLoadingProvinces } = useGetProvinces();
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
    <section className="my-[40px]">
      <div className="flex justify-center flex-wrap gap-6">
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
                  <div
                    key={address._id}
                    className="border-t border-gray-300 py-[20px]"
                  >
                    <div className="flex justify-between flex-wrap gap-y-[8px]">
                      <div className="flex flex-col gap-[8px]">
                        <p className="font-medium">
                          Họ và tên:{" "}
                          <span className="font-normal">
                            {address.fullname}
                          </span>
                        </p>

                        <p className="font-medium">
                          Số điện thoại:{" "}
                          <span className="font-normal">{address.phone}</span>
                        </p>

                        <p className="font-medium">
                          Địa chỉ:{" "}
                          <span className="font-normal">
                            {address.speaddress}, {address.city}, {address.ward}
                          </span>
                        </p>
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
        <>
          {!addressId && !isLoadingProvinces && (
            <AddressModal
              provinces={provinces!}
              addressId=""
              toggleMenu={toggleAddressModal}
              isOpen={openAddressModal}
            />
          )}

          {addressId && !isLoadingAddress && !isLoadingProvinces && (
            <AddressModal
              provinces={provinces!}
              addressId={addressId}
              toggleMenu={toggleAddressModal}
              isOpen={openAddressModal}
            />
          )}
        </>
      )}
    </section>
  );
}

export default AddressInfo;
