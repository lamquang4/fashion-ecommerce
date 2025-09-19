"use client";
import Link from "next/link";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import Image from "./Image";
import { memo } from "react";
function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200  px-[15px]">
      <div className="mx-auto max-w-[1230px] w-full">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] py-[60px]">
          <div>
            <Link href={"/"}>
              <Image
                Src={"/assets/other/logo.png"}
                Alt={"logo"}
                ClassName={"w-[80px]"}
                loadingType="eager"
              />
            </Link>
          </div>

          <div>
            <ul>
              <li>
                <p className="relative font-bold text-black text-[0.95rem] uppercase mb-3 pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:bg-black after:w-[60px] after:h-[1.5px]">
                  Chính sách
                </p>
              </li>

              <li className="py-[8px]">
                <Link
                  href="/"
                  className="inline-block max-w-max text-gray-500 font-medium text-[0.9rem] hover:text-black"
                >
                  Trang chủ
                </Link>
              </li>

              <li className="py-[8px]">
                <Link
                  href="/collection/all"
                  className="inline-block max-w-max text-gray-500 font-medium text-[0.9rem] hover:text-black"
                >
                  Sản phẩm
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <ul>
              <li>
                <p className="relative font-bold text-black text-[0.95rem] uppercase mb-3 pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:bg-black after:w-[60px] after:h-[1.5px]">
                  Chính sách
                </p>
              </li>

              <li className="py-[8px]">
                <Link
                  href="/"
                  className="inline-block max-w-max text-gray-500 font-medium text-[0.9rem] hover:text-black"
                >
                  Trang chủ
                </Link>
              </li>

              <li className="py-[8px]">
                <Link
                  href="/collection/all"
                  className="inline-block max-w-max text-gray-500 font-medium text-[0.9rem] hover:text-black"
                >
                  Sản phẩm
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <ul>
              <li>
                <p className="relative font-bold text-black text-[0.95rem] uppercase mb-3 pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:bg-black after:w-[60px] after:h-[1.5px]">
                  Theo dõi
                </p>
              </li>

              <li>
                <ul className="flex justify-start items-center gap-3">
                  <li className="py-[8px]">
                    <Link
                      className="inline-block max-w-max text-gray-500 font-medium text-[0.9rem]"
                      href={"/"}
                      title="Instagram"
                    >
                      <FaInstagram size={25} />
                    </Link>
                  </li>
                  <li className="py-[8px]">
                    <Link
                      className="inline-block max-w-max text-gray-500 font-medium text-[0.9rem]"
                      href={"/"}
                      title="Facebook"
                    >
                      <FaFacebookSquare size={25} />
                    </Link>
                  </li>
                  <li className="py-[8px]">
                    <Link
                      className="inline-block max-w-max text-gray-500 font-medium text-[0.9rem]"
                      href={"/"}
                      title="Youtube"
                    >
                      <IoLogoYoutube size={25} />
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center py-[15px]">
          <p className="font-medium text-gray-500">© Aura Vietnam 2025</p>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
