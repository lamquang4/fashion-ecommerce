"use client";
import SideBarMenu from "../SideBarMenu";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import OrderHistory from "./OrderHistory";

function Order() {
  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  return (
    <section className="my-[40px]">
      <div className="flex justify-center flex-wrap gap-6">
        <SideBarMenu />

        <OrderHistory />
      </div>
    </section>
  );
}

export default Order;
