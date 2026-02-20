"use client";
import { useEffect, useState } from "react";
import SideBarMenu from "../ui/SideBarMenu";
import AddressModal from "./AddressModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AddressInfo from "./AddressInfo";
import BreadCrumb from "../ui/BreadCrumb";
import useGetAddresses from "@/hooks/useGetAddresses";
function AddressContainer() {
  const { status } = useSession();
  const router = useRouter();
  const { addresses, mutate, isLoading } = useGetAddresses();

  const [addressId, setAddressId] = useState<string>("");
  const [openAddressModal, setOpenAddressModal] = useState<boolean>(false);

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
              onToggleModal={toggleAddressModal}
              addresses={addresses}
              mutate={mutate}
              isLoading={isLoading}
              setAddressId={setAddressId}
            />
          </div>
        </div>

        {openAddressModal && (
          <AddressModal
            addressId={addressId}
            mutateAddresses={mutate}
            addressesLength={addresses.length}
            onToggleModal={toggleAddressModal}
            isOpen={openAddressModal}
          />
        )}
      </section>
    </>
  );
}

export default AddressContainer;
