"use client";
import Link from "next/link";
import Image from "../ui/Image";
import { memo } from "react";
function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 px-[15px]">
      <div className="mx-auto w-full max-w-[1230px]">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 py-8">
          <div className="col-span-full lg:col-span-1 space-y-4">
            <Link href={"/"}>
              <Image
                src={"/assets/other/logo.png"}
                alt={"logo"}
                className={"w-[80px]"}
                loading="eager"
              />
            </Link>
            <p className=" text-gray-500">
              Aura nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ
              đặt mua và nhận hàng trực tiếp.
            </p>
          </div>

          <div className="lg:mx-auto text-left space-y-4">
            <h5 className="relative font-bold text-black uppercase">
              Các trang
            </h5>
            <ul className="transition-all duration-500 text-[0.9rem] space-y-4">
              <li>
                <Link
                  href="/"
                  className=" text-gray-500 font-medium text-[0.9rem] hover:text-black"
                >
                  Trang chủ
                </Link>
              </li>

              <li>
                <Link
                  href={"/collection/all"}
                  className=" text-gray-500 font-medium text-[0.9rem] hover:text-black"
                >
                  Tất cả sách
                </Link>
              </li>

              <li>
                <Link
                  href={"/sale/nam"}
                  className=" text-gray-500 font-medium text-[0.9rem] hover:text-black"
                >
                  Giảm giá đồ nam
                </Link>
              </li>

              <li>
                <Link
                  href={"/sale/nu"}
                  className=" text-gray-500 font-medium text-[0.9rem] hover:text-black"
                >
                  Giảm giá đồ nữ
                </Link>
              </li>

              <li>
                <Link
                  href={"/cart"}
                  className=" text-gray-500 font-medium text-[0.9rem] hover:text-black"
                >
                  Giỏ hàng
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:mx-auto text-left space-y-4">
            <h5 className="relative font-bold text-black uppercase">DỊCH VỤ</h5>
            <ul className="transition-all duration-500 text-[0.9rem] space-y-4">
              <li>
                <Link
                  href="/"
                  className=" text-gray-500 font-medium text-[0.9rem] hover:text-black"
                >
                  Điều khoản sử dụng
                </Link>
              </li>

              <li>
                <Link
                  href={"/"}
                  className=" text-gray-500 font-medium text-[0.9rem] hover:text-black"
                >
                  Chính sách bảo mật thông tin cá nhân
                </Link>
              </li>

              <li>
                <Link
                  href={"/"}
                  className=" text-gray-500 font-medium text-[0.9rem] hover:text-black"
                >
                  Chính sách bảo mật thanh toán
                </Link>
              </li>

              <li>
                <Link
                  href={"/"}
                  className=" text-gray-500 font-medium text-[0.9rem] hover:text-black"
                >
                  Giới thiệu Fahasa
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:mx-auto text-left space-y-4">
            <h5 className="relative font-bold text-black uppercase">Hỗ trợ</h5>
            <ul className="transition-all duration-500 text-[0.9rem] space-y-4">
              <li>
                <Link
                  href="/"
                  className=" text-gray-500 font-medium text-[0.9rem] hover:text-black"
                >
                  Chính sách đổi - trả - hoàn tiền
                </Link>
              </li>

              <li>
                <Link
                  href={"/"}
                  className=" text-gray-500 font-medium text-[0.9rem] hover:text-black"
                >
                  Chính sách bảo hành - bồi hoàn
                </Link>
              </li>

              <li>
                <Link
                  href={"/"}
                  className=" text-gray-500 font-medium text-[0.9rem] hover:text-black"
                >
                  Chính sách vận chuyển
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-4 border-t border-gray-200 text-center">
          <p className="font-medium text-gray-500">© Fahasa Vietnam 2025</p>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
