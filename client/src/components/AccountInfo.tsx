"use client";
import { useRouter } from "next/navigation";
import SideBarMenu from "./SideBarMenu";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

function AccountInfo() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);
  return (
    <section className="w-full my-[40px]">
      <div className="flex justify-center flex-wrap gap-8">
        <SideBarMenu />

        <div className="w-full max-w-full lg:max-w-[700px] px-[15px]">
          <h2 className="text-[1.5rem] capitalize font-semibold mb-[25px]">
            Tài khoản
          </h2>
          <div className="mb-[25px]">
            <div className="w-full">
              <label htmlFor="" className="block text-left text-[0.9rem]">
                Họ và tên:
              </label>
              <input
                type="text"
                name="fullname"
                className="w-full rounded-[5px] p-[6px_10px] text-[0.9rem] border border-gray-300 mt-[5px] not-last:mb-[15px] focus:outline-0"
                value={session?.user.fullname || ""}
                readOnly
              />

              <label htmlFor="" className="block text-left text-[0.9rem]">
                Email:
              </label>
              <input
                type="text"
                name="email"
                className="w-full rounded-[5px] p-[6px_10px] text-[0.9rem] border border-gray-300 mt-[5px] not-last:mb-[15px] focus:outline-0"
                value={session?.user.email || ""}
                readOnly
              />

              <label htmlFor="" className="block text-left text-[0.9rem]">
                Số điện thoại:
              </label>
              <input
                type="number"
                name="phone"
                inputMode="numeric"
                className="w-full rounded-[5px] p-[6px_10px] text-[0.9rem] border border-gray-300 mt-[5px] not-last:mb-[15px] focus:outline-0"
                value={session?.user.phone || ""}
                readOnly
              />

              <label htmlFor="" className="block text-left text-[0.9rem]">
                Sinh nhật:
              </label>
              <input
                type="date"
                name="birthday"
                className="w-full rounded-[5px] p-[6px_10px] text-[0.9rem] border border-gray-300 mt-[5px] not-last:mb-[15px] focus:outline-0"
                value={session?.user.birthday.slice(0, 10) || ""}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccountInfo;
