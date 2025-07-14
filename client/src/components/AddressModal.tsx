"use client";
import { HiMiniXMark } from "react-icons/hi2";
import Overplay from "./Overplay";
import useGetProvinces from "@/hooks/useGetProvinceVN";
import { useEffect, useState } from "react";
import useGetAddress from "@/hooks/useGetAddress";
import useUpdateAddress from "@/hooks/useUpdateAddress";
import { useSession } from "next-auth/react";
import useAddAddress from "@/hooks/useAddAddress";
import toast from "react-hot-toast";
import useGetAddresses from "@/hooks/useGetAddresses";
import { validatePhone } from "@/utils/validatePhone";

type AddressModalProps = {
  isOpen: boolean;
  toggleMenu: () => void;
  addressId: string;
};
function AddressModal({ isOpen, toggleMenu, addressId }: AddressModalProps) {
  const { data: session } = useSession();
  const { provinces } = useGetProvinces();
  const { address, mutate } = useGetAddress(addressId);
  const { addresses, mutate: mutateAddresses } = useGetAddresses(
    session?.user.id || ""
  );
  const { updateAddress } = useUpdateAddress(addressId);
  const { addAddress } = useAddAddress();
  const [selectedProvinceName, setSelectedProvinceName] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [data, setData] = useState({ fullname: "", phone: "", speaddress: "" });
  console.log(address);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const selectedProvince = provinces?.find(
    (province) => province.province === selectedProvinceName
  );

  useEffect(() => {
    if (address) {
      setData({
        fullname: address.fullname || "",
        phone: address.phone || "",
        speaddress: address.speaddress || "",
      });
      setSelectedProvinceName(address.city || "");
      setSelectedWard(address.ward || "");
    }
  }, [address]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhone(data.phone)) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }

   if (addresses.length === 5 && !addressId) {
      toast.error("Bạn chỉ có thể lưu tối đa 5 địa chỉ cho tài khoản");
      return;
    }

    try {
      const payload = {
        fullname: data.fullname.trim(),
        phone: data.phone,
        speaddress: data.speaddress.trim(),
        city: selectedProvinceName,
        ward: selectedWard,
        user: session?.user.id,
      };

      if (addressId) {
        await updateAddress(payload);
        toast.success("Cập nhật địa chỉ thành công");
      } else {
        await addAddress(payload);
        toast.success("Thêm địa chỉ thành công");
      }

      setData({
        fullname: "",
        phone: "",
        speaddress: "",
      });

      setSelectedProvinceName("");
      setSelectedWard("");

      mutateAddresses();
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-20 h-full">
        <div className="relative w-full max-w-lg max-h-full">
          <div className="relative  p-[25px_15px] bg-white z-20">
            <div className="flex items-center justify-between">
              <h2 className="text-[1.2rem] font-semibold text-gray-900  uppercase">
                Địa chỉ mới
              </h2>
              <button
                type="button"
                className="text-gray-600 bg-transparent hover:text-black ms-auto"
                onClick={toggleMenu}
              >
                <HiMiniXMark size={25} />
              </button>
            </div>

            <hr className=" border-slate-300 my-[15px]" />

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-[20px] grid-cols-2">
                <div className="col-span-2 w-full">
                  <label
                    htmlFor="fullname"
                    className="block mb-2 text-[0.9rem] font-medium text-gray-900 dark:text-white"
                  >
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    onChange={handleChange}
                    value={data.fullname}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.9rem] rounded-sm block w-full p-2 outline-0"
                    placeholder="Họ và tên"
                  />
                </div>

                <div className="col-span-2 w-full">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-[0.9rem] font-medium text-gray-900 dark:text-white"
                  >
                    Số điện thoại
                  </label>
                  <input
                    type="number"
                    name="phone"
                    onChange={handleChange}
                    value={data.phone}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.9rem] rounded-sm block w-full p-2 outline-0"
                    placeholder="Số điện thoại"
                  />
                </div>

                <div className="col-span-2 w-full">
                  <label
                    htmlFor="speaddress"
                    className="block mb-2 text-[0.9rem] font-medium text-gray-900 dark:text-white"
                  >
                    Địa chỉ cụ thể
                  </label>
                  <input
                    type="text"
                    name="speaddress"
                    onChange={handleChange}
                    value={data.speaddress}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.9rem] rounded-sm block w-full p-2 outline-0"
                    placeholder="Địa chỉ cụ thể"
                  />
                </div>

                <div className="col-span-2 w-full">
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tỉnh/thành phố
                  </label>
                  <select
                    name="cỉty"
                    required
                    value={selectedProvinceName}
                    onChange={(e) => {
                      setSelectedProvinceName(e.target.value);
                      setSelectedWard("");
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.9rem] rounded-sm block w-full p-2 outline-0"
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    {provinces?.map((province) => (
                      <option key={province.id} value={province.province}>
                        {province.province}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2 w-full">
                  <label
                    htmlFor="ward"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phường/xã
                  </label>
                  <select
                    name="ward"
                    required
                    disabled={!selectedProvince}
                    value={selectedWard}
                    onChange={(e) => setSelectedWard(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.9rem] rounded-sm block w-full p-2 outline-0"
                  >
                    <option value="">Chọn phường/xã</option>
                    {selectedProvince?.wards.map((ward, idx) => (
                      <option key={idx} value={ward.name}>
                        {ward.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-[15px]">
                <button
                  type="submit"
                  className="px-[14px] py-[8px] bg-red-600 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-red-700"
                >
                  {addressId ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
                </button>

                <button
                  type="button"
                  onClick={toggleMenu}
                  className="px-[14px] py-[8px] bg-transparent text-black border border-gray-300 text-[0.9rem] font-medium text-center rounded-sm hover:bg-gray-100"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>

          {isOpen && <Overplay closeMenu={toggleMenu} IndexForZ={15} />}
        </div>
      </div>
    </>
  );
}

export default AddressModal;
