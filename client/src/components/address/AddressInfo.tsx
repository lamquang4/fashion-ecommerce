"use client";
import useDeleteAddress from "@/hooks/useDeleteAddress";
import toast from "react-hot-toast";
import Loading from "../Loading";
import Image from "../ui/Image";
import { Address } from "@/types/type";

type Props = {
  onToggleModal: () => void;
  setAddressId: (value: string) => void;
  addresses: Address[];
  isLoading: boolean;
  mutate: () => void;
};

function AddressInfo({
  onToggleModal,
  setAddressId,
  addresses,
  isLoading,
  mutate,
}: Props) {
  const { deleteAddress, isLoading: isLoadingDeleteAddress } =
    useDeleteAddress();

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
    <div className="w-full max-w-full flex-1 px-[15px]">
      <div className="space-y-[20px]">
        <h2>Sổ địa chỉ</h2>

        <button
          onClick={onToggleModal}
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
                      <span className="font-normal">{address.fullname}</span>
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
                        onToggleModal();
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
  );
}

export default AddressInfo;
