"use client";
import { useSession } from "next-auth/react";
function Account() {
  const { data: session } = useSession({
    required: true,
  });

  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-full">
      <form className="flex flex-col gap-7 w-full">
        <h1 className="font-bold text-[1.5rem] text-[#74767d]">Tài khoản</h1>

        <div className="gap-[25px] w-full flex flex-wrap lg:flex-nowrap">
          <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
            <p className="font-bold text-[1rem] text-[#74767d]">
              Thông tin cá nhân
            </p>

            <div className="flex flex-col gap-1 w-full ">
              <label htmlFor="" className="text-[0.9rem] text-black">
                Họ tên
              </label>
              <input
                type="text"
                name="fullname"
                value={session?.user.fullname || ""}
                readOnly
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
            </div>

            <div className="flex flex-col gap-1 w-full ">
              <label htmlFor="" className="text-[0.9rem] text-black">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={session?.user.email || ""}
                readOnly
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
            </div>

            <div className="flex flex-wrap md:flex-nowrap gap-[15px]">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="" className="text-[0.9rem] text-black">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="phone"
                  value={session?.user.phone || ""}
                  readOnly
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="" className="text-[0.9rem] text-black">
                  Sinh nhật
                </label>
                <input
                  type="date"
                  name="birthday"
                  value={session?.user.birthday?.slice(0, 10) || ""}
                  readOnly
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 w-full ">
              <label htmlFor="" className="text-[0.9rem] text-black">
                Chức vụ
              </label>
              <input
                type="text"
                name="role"
                value={
                  session?.user.role === 0
                    ? "Quản trị viên"
                    : session?.user.role === 1
                    ? "Nhân viên bán hàng"
                    : session?.user.role === 2
                    ? "Nhân viên nội dung"
                    : ""
                }
                readOnly
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Account;
