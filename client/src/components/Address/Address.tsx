"use client";
import { useEffect, useState } from "react";
import SideBarMenu from "../SideBarMenu";
import AddressModal from "./AddressModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useGetAddress from "@/hooks/useGetAddress";
import useGetProvinces from "@/hooks/useGetProvinceVN";
import AddressInfo from "./AddressInfo";
import BreadCrumb from "../BreadCrumb";
function Address() {
  const { status } = useSession();
  const router = useRouter();

  const [addressId, setAddressId] = useState<string>("");
  const [openAddressModal, setOpenAddressModal] = useState<boolean>(false);
  const { isLoading: isLoadingAddress } = useGetAddress(addressId);
  const { provinces, isLoading: isLoadingProvinces } = useGetProvinces();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const toggleAddressModal = () => {
    setOpenAddressModal((prev) => !prev);
    setAddressId("");
  };

  const array = [
    {
      name: "Trang chủ",
      href: "/",
    },
    {
      name: "Sổ địa chỉ",
    },
  ];

  return (
    <>
      <BreadCrumb items={array} />

      <section className="mb-[40px]">
        <div className="w-full max-w-[1230px] mx-auto">
           <div className="flex justify-center flex-wrap gap-5">
          <SideBarMenu />

          <AddressInfo
            toggleAddressModal={toggleAddressModal}
            setAddressId={setAddressId}
          />
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
    </>
  );
}

export default Address;
