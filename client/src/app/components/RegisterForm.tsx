import Link from "next/link";
import DifferentLR from "./DifferentLR";

function RegisterForm() {
  return (
    <section className="mt-[30px] sm:mt-[45px]">
      <div className="flex flex-col items-center justify-center  px-[10px] sm:px-[15px]">
        <div className="w-full bg-white md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-[1.5rem] sm:text-[1.7rem] uppercase font-[550] mb-[20px] text-center text-black">
              Đăng kí
            </h2>
            <form className="space-y-4 md:space-y-6" action="#">
              <div className="mb-[15px]">
                <label
                  htmlFor=""
                  className="block mb-2 text-[0.9rem] font-medium text-gray-900 dark:text-white"
                >
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="fullname"
                  className="text-[0.9rem] block w-full px-3 py-2 border border-[#e5e5e5] text-[#243238]"
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>
              <div className="mb-[15px]">
                <label
                  htmlFor=""
                  className="block mb-2 text-[0.9rem] font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="text-[0.9rem] block w-full px-3 py-2 border border-[#e5e5e5] text-[#243238]"
                  placeholder="Nhập email"
                  required
                />
              </div>
              <div className="mb-[15px]">
                <label
                  htmlFor=""
                  className="block mb-2 text-[0.9rem] font-medium text-gray-900 dark:text-white"
                >
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="text-[0.9rem] block w-full px-3 py-2 border border-[#e5e5e5] text-[#243238]"
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>
              <div className="mb-[15px]">
                <label
                  htmlFor=""
                  className="block mb-2 text-[0.9rem] font-medium text-gray-900 dark:text-white"
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Nhập mật khẩu"
                  className="text-[0.9rem] block w-full px-3 py-2 border border-[#e5e5e5] text-[#243238]"
                  required
                />
              </div>
              <div className="mb-[25px]">
                <label
                  htmlFor=""
                  className="block mb-2 text-[0.9rem] font-medium text-gray-900 dark:text-white"
                >
                  Xác nhận mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Nhập xác nhận mật khẩu"
                  className="text-[0.9rem] block w-full px-3 py-2 border border-[#e5e5e5] text-[#243238]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Đăng nhập
              </button>
              <p className="flex gap-1.5 justify-center font-light text-[0.9rem]">
                Bạn đã có tài khoản?
                <Link href="/login" className="text-blue-400 font-medium">
                  Đăng nhập
                </Link>
              </p>

              <DifferentLR title={"đăng kí"} />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterForm;
