"use client";
import SideBarMenu from "../ui/SideBarMenu";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import OrderHistory from "./OrderHistory";
import BreadCrumb from "../ui/BreadCrumb";

function OrderContainer() {
  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const array = [
    {
      name: "Trang chủ",
      href: "/",
    },
    {
      name: "Đơn hàng",
    },
  ];

  return (
    <>
      <BreadCrumb items={array} />

      <section className="mb-[40px]">
        <div className="w-full max-w-[1230px] mx-auto relative">
          <div className="flex justify-center flex-wrap gap-5">
            <SideBarMenu />

            <OrderHistory />
          </div>
        </div>
      </section>
    </>
  );
}

export default OrderContainer;
