"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import SideBarMenu from "../SideBarMenu";
import AccountInfo from "./AccountInfo";
import BreadCrumb from "../BreadCrumb";

function Account() {
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
      name: "Thông tin tài khoản",
    },
  ];
  return (
    <>
      <BreadCrumb items={array} />
      <section className="mb-[40px]">
        <div className="w-full max-w-[1230px] mx-auto">
          <div className=" flex justify-center flex-wrap gap-5">
            <SideBarMenu />

            <AccountInfo />
          </div>
        </div>
      </section>
    </>
  );
}

export default Account;
