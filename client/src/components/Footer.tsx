"use client";
import Link from "next/link";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import Image from "./Image";
import { memo } from "react";
function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-[10px] sm:px-[15px] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:py-[80px] py-[70px]">
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
                <h2 className="relative font-bold text-black text-[0.935rem] uppercase mb-3 pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:bg-black after:w-[60px] after:h-[1.5px]">
                  Chính sách
                </h2>
              </li>

              <li className="py-[8px]">
                <Link
                  href="/"
                  className="inline-block max-w-max text-[#707072] font-medium text-[0.9rem] hover:text-black"
                >
                  Trang chủ
                </Link>
              </li>

              <li className="py-[8px]">
                <Link
                  href="/collection/all"
                  className="inline-block max-w-max text-[#707072] font-medium text-[0.9rem] hover:text-black"
                >
                  Sản phẩm
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <ul>
              <li>
                <h2 className="relative font-bold text-black text-[0.935rem] uppercase mb-3 pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:bg-black after:w-[60px] after:h-[1.5px]">
                  Chính sách
                </h2>
              </li>

              <li className="py-[8px]">
                <Link
                  href="/"
                  className="inline-block max-w-max text-[#707072] font-medium text-[0.9rem] hover:text-black"
                >
                  Trang chủ
                </Link>
              </li>

              <li className="py-[8px]">
                <Link
                  href="/collection/all"
                  className="inline-block max-w-max text-[#707072] font-medium text-[0.9rem] hover:text-black"
                >
                  Sản phẩm
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <ul>
              <li>
                <h2 className="relative font-bold text-black text-[0.935rem] uppercase mb-3 pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:bg-black after:w-[60px] after:h-[1.5px]">
                  Theo dõi
                </h2>
              </li>

              <li>
                <ul className="flex justify-start items-center gap-3">
                  <li className="py-[8px]">
                    <Link
                      className="inline-block max-w-max text-[#707072] font-medium text-[0.9rem]"
                      href={"/"}
                      title="Instagram"
                    >
                      <FaInstagram size={25} />
                    </Link>
                  </li>
                  <li className="py-[8px]">
                    <Link
                      className="inline-block max-w-max text-[#707072] font-medium text-[0.9rem]"
                      href={"/"}
                      title="Facebook"
                    >
                      <FaFacebookSquare size={25} />
                    </Link>
                  </li>
                  <li className="py-[8px]">
                    <Link
                      className="inline-block max-w-max text-[#707072] font-medium text-[0.9rem]"
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

        <div className="text-center py-[15px] mx-auto">
          <p className="text-[hsl(0,0%,47%)] text-[0.9375rem] font-medium capitalize">
            © 2025 Aura
          </p>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
