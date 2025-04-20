import React from "react";

function Account() {
  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-full">
      <form className="flex flex-col gap-6 w-full">
        <h1 className="font-bold text-[1.5rem] text-[#74767d]">Tài khoản</h1>

        <div className="gap-[20px] w-full flex flex-wrap md:flex-nowrap">
          <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
            <p className="font-bold text-[1rem] text-[#74767d] mb-[10px]">
              Thông tin cá nhân
            </p>

            <div className="flex flex-col gap-1 w-full ">
              <label htmlFor="" className="text-[0.9rem] text-black">
                Họ tên
              </label>
              <input
                type="text"
                name="fullname"
                required
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
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
            </div>

            <div className="flex flex-col gap-1 w-full  ">
              <label htmlFor="" className="text-[0.9rem] text-black">
                Số điện thoại
              </label>
              <input
                type="number"
                name="phone"
                required
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
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
            </div>

            <div className="flex justify-center gap-6 mt-6">
              <button
                type="submit"
                className="px-[14px] py-[8px] bg-teal-500 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-teal-600"
              >
                Cập nhật
              </button>
            </div>
          </div>

          <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
            <p className="font-bold text-[1rem] text-[#74767d] mb-[10px]">
              Thay đổi mật khẩu
            </p>

            <div className="flex flex-col gap-1 w-full ">
              <label htmlFor="" className="text-[0.9rem] text-black">
                Mật khẩu hiện tại
              </label>
              <input
                type="password"
                name="password"
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
            </div>

            <div className="flex flex-col gap-1 w-full ">
              <label htmlFor="" className="text-[0.9rem] text-black">
                Mật khẩu mới
              </label>
              <input
                type="text"
                name="newpassword"
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
            </div>

            <div className="flex flex-col gap-1 w-full  ">
              <label htmlFor="" className="text-[0.9rem] text-black">
                Nhập lại mật khẩu
              </label>
              <input
                type="text"
                name="repassword"
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
            </div>

            <div className="flex justify-center gap-6 mt-6">
              <button
                type="submit"
                className="px-[14px] py-[8px] bg-teal-500 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-teal-600"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Account;
