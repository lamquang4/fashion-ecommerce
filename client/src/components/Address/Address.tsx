"use client";
import { useEffect, useState } from "react";
import SideBarMenu from "../SideBarMenu";
import AddressModal from "./AddressModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useGetAddress from "@/hooks/useGetAddress";
import useGetProvinces from "@/hooks/useGetProvinceVN";
import AddressInfo from "./AddressInfo";
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

  return (
    <section className="my-[40px]">
      <div className="flex justify-center flex-wrap gap-6">
        <SideBarMenu />

        <AddressInfo
          toggleAddressModal={toggleAddressModal}
          setAddressId={setAddressId}
        />
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

export default Address;
