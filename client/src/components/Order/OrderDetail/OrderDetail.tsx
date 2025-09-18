"use client";
import SideBarMenu from "../../SideBarMenu";
import { useParams, useRouter } from "next/navigation";
import useGetOrder from "@/hooks/useGetOrder";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import OrderInfo from "./OrderInfo";
import BreadCrumb from "@/components/BreadCrumb";
function OrderDetail() {
  const params = useParams();
  const code = params.code as string;
  const { order, isLoading } = useGetOrder(code);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (isLoading) return;

    if (!order) {
      toast.error("Không tìm thấy đơn hàng");
      router.push("/order");
      return;
    }
  }, [order, isLoading, router]);

  const array = [
    {
      name: "Trang chủ",
      href: "/",
    },
    {
      name: "Đơn hàng",
      href: "/order",
    },
    {
      name: `Mã đơn ${code}`,
    },
  ];

  return (
    <>
      <BreadCrumb items={array} />

      <section className="mb-[40px]">
        <div className="w-full max-w-[1230px] mx-auto">
          <div className="flex justify-center flex-wrap gap-5">
            <SideBarMenu />

            <OrderInfo order={order!} isLoading={isLoading} />
          </div>
        </div>
      </section>
    </>
  );
}

export default OrderDetail;
