"use client";
import { useSession } from "next-auth/react";

function AccountInfo() {
  const { data: session } = useSession();
  return (
    <div className="w-full flex-1 px-[15px]">
      <div className="space-y-[20px]">
        <h2>Thông tin tài khoản</h2>

        <div className="flex flex-col gap-[15px]">
          <div className="space-y-[5px]">
            <label
              htmlFor=""
              className="block text-left text-[0.9rem] font-medium"
            >
              Họ và tên:
            </label>
            <input
              type="text"
              name="fullname"
              className="w-full rounded-sm p-[6px_10px] text-[0.9rem] border border-gray-300  focus:outline-0"
              value={session?.user.fullname || ""}
              readOnly
            />
          </div>

          <div className="space-y-[5px]">
            <label
              htmlFor=""
              className="block text-left text-[0.9rem] font-medium"
            >
              Email:
            </label>
            <input
              type="text"
              name="email"
              className="w-full rounded-sm p-[6px_10px] text-[0.9rem] border border-gray-300  focus:outline-0"
              value={session?.user.email || ""}
              readOnly
            />
          </div>

          <div className="space-y-[5px]">
            <label
              htmlFor=""
              className="block text-left text-[0.9rem] font-medium"
            >
              Số điện thoại:
            </label>
            <input
              type="number"
              name="phone"
              inputMode="numeric"
              className="w-full rounded-sm p-[6px_10px] text-[0.9rem] border border-gray-300  focus:outline-0"
              value={session?.user.phone || ""}
              readOnly
            />
          </div>

          <div className="space-y-[5px]">
            <label
              htmlFor=""
              className="block text-left text-[0.9rem] font-medium"
            >
              Sinh nhật:
            </label>
            <input
              type="date"
              name="birthday"
              className="w-full rounded-sm p-[6px_10px] text-[0.9rem] border border-gray-300  focus:outline-0"
              value={session?.user.birthday.slice(0, 10) || ""}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
