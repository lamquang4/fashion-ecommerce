"use client";
import Link from "next/link";
import React from "react";
import { HiOutlineMinusSmall } from "react-icons/hi2";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import Image from "./Image";
function CartItem() {
  return (
    <>
      <section className="max-w-[1230px] mx-auto mt-[30px] sm:mt-[45px]">
        <div className=" px-[10px] sm:px-[15px]">
          <h2 className="text-[1.5rem] sm:text-[1.7rem] font-[550] mb-[15px]">
            Giỏ hàng
          </h2>

          <form action="">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-5 bg-white">
                <div className="flex gap-4 bg-white px-2.5 sm:px-4 py-6 border border-gray-300 rounded-sm">
                  <div className="flex gap-4.5">
                    <Link href={"/"}>
                      <div className="w-50 h-50 max-sm:w-30 max-sm:h-30 shrink-0">
                        <Image
                          Src={"/assets/products/IMGSP3483.png"}
                          Alt={""}
                          ClassName={"w-full h-full object-cover"}
                        />
                      </div>
                    </Link>

                    <div className="flex flex-col gap-4">
                      <div>
                        <Link
                          href={"/"}
                          className="text-[0.85rem] sm:text-[0.95rem] font-medium text-slate-900"
                        >
                          Áo sơ cổ dài ưewewe
                        </Link>
                        <p className="text-[0.85rem] sm:text-[0.95rem]  font-medium text-[#898989] mt-2 flex items-center gap-2">
                          XL / Trắng
                        </p>
                      </div>

                      <div className="mt-auto flex items-center gap-3.5">
                        <button
                          type="button"
                          className="flex items-center justify-center w-6.5 h-6.5 bg-white border border-[#8c9196] outline-none rounded-full"
                        >
                          <HiOutlineMinusSmall size={25} />
                        </button>
                        <span className="font-normal text-[1.2rem] leading-[18px]">
                          2
                        </span>
                        <button
                          type="button"
                          className="flex items-center justify-center w-6.5 h-6.5 bg-white border border-[#8c9196] outline-none rounded-full"
                        >
                          <HiOutlinePlusSmall size={25} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto flex flex-col">
                    <div className="flex gap-4 justify-end">
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4.5 h-4.5 cursor-pointer fill-slate-400 hover:fill-pink-600 inline-block"
                          viewBox="0 0 64 64"
                        >
                          <path
                            d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </button>

                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 cursor-pointer fill-slate-400 hover:fill-red-600 inline-block"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                            data-original="#000000"
                          ></path>
                          <path
                            d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <h3 className="text-[1rem] font-normal text-slate-900 mt-auto">
                      150,000₫
                    </h3>
                  </div>
                </div>

                <div className="flex gap-4 bg-white px-2.5 sm:px-4 py-6 border border-gray-300 rounded-md">
                  <div className="flex gap-4.5">
                    <Link href={"/"}>
                      <div className="w-50 h-50 max-sm:w-30 max-sm:h-30 shrink-0">
                        <Image
                          Src={"/assets/products/IMGSP3483.png"}
                          Alt={""}
                          ClassName={"w-full h-full object-cover"}
                        />
                      </div>
                    </Link>

                    <div className="flex flex-col gap-4">
                      <div>
                        <Link
                          href={"/"}
                          className="text-[0.85rem] sm:text-[0.95rem] font-medium text-slate-900"
                        >
                          Áo sơ cổ dài ưewewe
                        </Link>
                        <p className="text-[0.85rem] sm:text-[0.95rem]  font-medium text-[#898989] mt-2 flex items-center gap-2">
                          XL / Trắng
                        </p>
                      </div>

                      <div className="mt-auto flex items-center gap-3.5">
                        <button
                          type="button"
                          className="flex items-center justify-center w-6.5 h-6.5 bg-white border border-[#8c9196] outline-none rounded-full"
                        >
                          <HiOutlineMinusSmall size={25} />
                        </button>
                        <span className="font-normal text-[1.2rem] leading-[18px]">
                          2
                        </span>
                        <button
                          type="button"
                          className="flex items-center justify-center w-6.5 h-6.5 bg-white border border-[#8c9196] outline-none rounded-full"
                        >
                          <HiOutlinePlusSmall size={25} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto flex flex-col">
                    <div className="flex gap-4 justify-end">
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4.5 h-4.5 cursor-pointer fill-slate-400 hover:fill-pink-600 inline-block"
                          viewBox="0 0 64 64"
                        >
                          <path
                            d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </button>

                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 cursor-pointer fill-slate-400 hover:fill-red-600 inline-block"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                            data-original="#000000"
                          ></path>
                          <path
                            d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <h3 className="text-[1rem] font-normal text-slate-900 mt-auto">
                      150,000₫
                    </h3>
                  </div>
                </div>
              </div>

              <div className="bg-[#F7F7F7] rounded-sm px-4 py-6 h-auto">
                <div className="">
                  <label
                    htmlFor="discount"
                    className="block text-[1rem] font-semibold mb-[5px]"
                  >
                    Mã giảm giá
                  </label>
                  <div className="flex gap-[15px] items-center">
                    <input
                      type="text"
                      id="discount"
                      name="discount"
                      className="w-full rounded-md border border-gray-200 px-2.5 py-2 text-[0.9rem] outline-none focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Mã giảm giá"
                    />

                    <button className="w-[120px] text-[0.9rem] rounded-md bg-[#197FB6] py-2 font-medium text-white">
                      Sử dụng
                    </button>
                  </div>
                </div>

                <hr className="border-slate-300 my-[20px]" />

                <ul className="text-slate-900 font-medium space-y-4">
                  <li className="flex flex-wrap gap-4 text-[1.1rem] font-semibold">
                    Tổng cộng <span className="ml-auto">450,000₫</span>
                  </li>
                </ul>

                <hr className="border-slate-300 my-[20px]" />

                <div className="space-y-[20px]">
                  <button
                    type="button"
                    className="text-[0.9rem] px-4 py-2.5 w-full font-semibold tracking-wide bg-slate-900 hover:bg-slate-700 text-white rounded-md"
                  >
                    Thanh toán
                  </button>

                  <Link
                    className="text-[0.9rem] px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-200 text-slate-900 border border-slate-300 rounded-md text-center"
                    href={"/shop"}
                  >
                    Tiếp tục mua sắm
                  </Link>
                </div>

                <div className="mt-[20px] flex flex-wrap justify-center gap-4">
                  {/*
<img
                      src="https://readymadeui.com/images/master.webp"
                      alt="card1"
                      className="w-10 object-contain"
                    />
                    <img
                      src="https://readymadeui.com/images/visa.webp"
                      alt="card2"
                      className="w-10 object-contain"
                    />
                    <img
                      src="https://readymadeui.com/images/american-express.webp"
                      alt="card3"
                      className="w-10 object-contain"
                    />
                      */}
                </div>
              </div>
            </div>
          </form>

          {/* Khi không có sản phẩm trong giỏ
      <div className="flex justify-center items-center h-[60vh]">
              <div>
                <div className="mb-[25px] flex justify-center">
                  <Image
                    Src={"/assets/other/empty-cart.png"}
                    Alt={""}
                    ClassName={"w-[190px]"}
                  />
                </div>

                <div className="flex justify-center flex-col gap-y-3 items-center">
                  <h2 className="text-[1.3rem] font-semibold">
                    Không có gì trong giỏ hết
                  </h2>
                  <button className="text-[1rem] border border-black rounded-md font-medium p-[10px_15px] hover:bg-black hover:text-white">
                    <Link href={"/shop"}>Mua sắm ngay</Link>
                  </button>
                </div>
              </div>
            </div>
  */}
        </div>
      </section>
    </>
  );
}

export default CartItem;
