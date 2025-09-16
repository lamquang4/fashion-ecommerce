"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import SideBarMenu from "../SideBarMenu";
import AccountInfo from "./AccountInfo";

function Account() {
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);
  return (
    <section className="my-[40px]">
      <div className=" w-full flex justify-center flex-wrap gap-6">
        <SideBarMenu />

        <AccountInfo />
      </div>
    </section>
  );
}

export default Account;
