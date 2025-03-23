"use client";
import Link from "next/link";
import React from "react";

function CheckoutForm() {
  return (
    <section className="max-w-6xl mx-auto my-[30px] sm:my-[45px]">
      <div className="w-full px-[10px] sm:px-[15px]">
        <Link href={"/"}>
          <img src="/assets/other/logo.png" alt="" width={"80px"} />
        </Link>

        <hr className="border-slate-300 my-[15px]" />

        <form action="">
          <div className="grid lg:grid-cols-2 gap-[50px]">
            <div className=" bg-gray-50 order-last lg:order-first">
              <p className="text-xl font-medium mb-[15px]">
                Thông tin giao hàng
              </p>

              <div className="">
                <div className="mb-[15px]">
                  <label
                    htmlFor="account_address"
                    className="mt-4 mb-2 block text-[0.9rem] font-medium"
                  >
                    Địa chỉ lưu trữ
                  </label>
                  <select
                    name="account_address"
                    className="w-full rounded-md text-[0.9rem] border border-gray-200 px-2.5 py-2 outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="Quận 6">
                      751 HB, Hồ Chí Minh, Quận 6, Phường 10
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="fullname"
                    className="mb-2 block text-[0.9rem] font-medium"
                  >
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    className="w-full rounded-md border border-gray-200 px-2.5 py-2 text-[0.9rem] outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Họ và tên"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mt-4 mb-2 block text-[0.9rem] font-medium"
                  >
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="w-full rounded-md border border-gray-200 px-2.5 py-2 text-[0.9rem] outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Số điện thoại"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="mt-4 mb-2 block text-[0.9rem] font-medium"
                  >
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="w-full rounded-md border border-gray-200 px-2.5 py-2 text-[0.9rem] outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Địa chỉ"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px]">
                  <div>
                    <label
                      htmlFor="city"
                      className="mt-4 mb-2 block text-[0.9rem] font-medium"
                    >
                      Thành phố
                    </label>
                    <select
                      name="city"
                      className="w-full rounded-md text-[0.9rem] border border-gray-200 px-2.5 py-2 outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="Hà nội">Hà nội</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="district"
                      className="mt-4 mb-2 block text-[0.9rem] font-medium"
                    >
                      Quận
                    </label>
                    <select
                      name="district"
                      className="w-full rounded-md text-[0.9rem] border border-gray-200 px-2.5 py-2 outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="Quận 6">Quận 6</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="ward"
                      className="mt-4 mb-2 block text-[0.9rem] font-medium"
                    >
                      Phường
                    </label>
                    <select
                      name="ward"
                      className="w-full rounded-md text-[0.9rem] border border-gray-200 px-2.5 py-2 text-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="Phường 6">Phường 6</option>
                    </select>
                  </div>
                </div>

                <div>
                  <p className="mt-8 text-lg font-medium">
                    Phương thức thanh toán
                  </p>
                  <div className="mt-5 grid gap-6">
                    <div className="relative">
                      <input
                        className="peer hidden"
                        id="radio_1"
                        type="radio"
                        name="radio"
                      />
                      <span className="peer-checked:border-[#197FB6] absolute right-4 top-1/2 box-content block h-2.5 w-2.5 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                      <label
                        className="peer-checked:border-1 peer-checked:border-[#197FB6] items-center gap-[10px] peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                        htmlFor="radio_1"
                      >
                        <svg
                          width="26"
                          height="20"
                          viewBox="0 0 26 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.12988 0.703125H24.8701C24.9268 0.70311 24.9829 0.71455 25.0353 0.736793C25.0877 0.759036 25.1353 0.791645 25.1754 0.832757C25.2155 0.873869 25.2472 0.92268 25.2689 0.976398C25.2906 1.03012 25.3018 1.08769 25.3018 1.14583V14.4271C25.3018 14.4852 25.2906 14.5428 25.2689 14.5965C25.2472 14.6502 25.2155 14.699 25.1754 14.7402C25.1353 14.7813 25.0877 14.8139 25.0353 14.8361C24.9829 14.8584 24.9268 14.8698 24.8701 14.8698H1.12988C1.07319 14.8698 1.01706 14.8584 0.964684 14.8361C0.912308 14.8139 0.864717 14.7813 0.824633 14.7402C0.78455 14.699 0.752754 14.6502 0.731068 14.5965C0.709381 14.5428 0.698227 14.4852 0.698242 14.4271V1.14583C0.698227 1.08769 0.709381 1.03012 0.731068 0.976398C0.752754 0.92268 0.78455 0.873869 0.824633 0.832757C0.864717 0.791645 0.912308 0.759036 0.964684 0.736793C1.01706 0.71455 1.07319 0.70311 1.12988 0.703125ZM1.56152 13.9844H24.4385V1.58854H1.56152V13.9844Z"
                            fill="#197FB6"
                          ></path>
                          <path
                            d="M22.7119 10.8854C22.3686 10.8858 22.0394 11.0258 21.7967 11.2748C21.5539 11.5238 21.4174 11.8614 21.417 12.2135C21.417 12.2716 21.4059 12.3292 21.3842 12.3829C21.3625 12.4367 21.3307 12.4855 21.2906 12.5266C21.2505 12.5677 21.2029 12.6003 21.1506 12.6225C21.0982 12.6448 21.042 12.6562 20.9854 12.6562H16.8848C16.7703 12.6562 16.6605 12.6096 16.5795 12.5265C16.4986 12.4435 16.4531 12.3309 16.4531 12.2135C16.4531 12.0961 16.4986 11.9835 16.5795 11.9005C16.6605 11.8174 16.7703 11.7708 16.8848 11.7708H20.5971C20.6825 11.3458 20.8874 10.9559 21.1866 10.6491C21.4857 10.3422 21.8659 10.1321 22.2803 10.0445V5.52834C21.8659 5.44077 21.4857 5.23059 21.1866 4.92378C20.8874 4.61698 20.6825 4.227 20.5971 3.80204H16.8848C16.7703 3.80204 16.6605 3.7554 16.5795 3.67238C16.4986 3.58935 16.4531 3.47675 16.4531 3.35933C16.4531 3.24192 16.4986 3.12932 16.5795 3.04629C16.6605 2.96327 16.7703 2.91663 16.8848 2.91663H20.9854C21.042 2.91661 21.0982 2.92805 21.1506 2.95029C21.2029 2.97254 21.2505 3.00515 21.2906 3.04626C21.3307 3.08737 21.3625 3.13618 21.3842 3.1899C21.4059 3.24362 21.417 3.30119 21.417 3.35933C21.4174 3.71146 21.5539 4.04905 21.7967 4.29804C22.0394 4.54703 22.3686 4.68708 22.7119 4.68746C22.7686 4.68744 22.8247 4.69888 22.8771 4.72113C22.9295 4.74337 22.9771 4.77598 23.0172 4.81709C23.0572 4.8582 23.089 4.90701 23.1107 4.96073C23.1324 5.01445 23.1436 5.07203 23.1436 5.13017V10.4427C23.1436 10.5008 23.1324 10.5584 23.1107 10.6121C23.089 10.6658 23.0572 10.7146 23.0172 10.7557C22.9771 10.7969 22.9295 10.8295 22.8771 10.8517C22.8247 10.874 22.7686 10.8854 22.7119 10.8854Z"
                            fill="#197FB6"
                          ></path>
                          <path
                            d="M9.11523 3.80204H5.40308C5.31769 4.227 5.11277 4.61698 4.81363 4.92378C4.5145 5.23059 4.13427 5.44077 3.71994 5.52834V10.0445C4.13427 10.1321 4.5145 10.3422 4.81363 10.6491C5.11277 10.9559 5.31769 11.3458 5.40308 11.7708H9.11523C9.22971 11.7708 9.3395 11.8174 9.42045 11.9005C9.5014 11.9835 9.54688 12.0961 9.54688 12.2135C9.54688 12.3309 9.5014 12.4435 9.42045 12.5265C9.3395 12.6096 9.22971 12.6562 9.11523 12.6562H5.01486C4.95817 12.6562 4.90203 12.6448 4.84966 12.6225C4.79728 12.6003 4.74969 12.5677 4.70961 12.5266C4.66952 12.4855 4.63773 12.4367 4.61604 12.3829C4.59436 12.3292 4.5832 12.2716 4.58322 12.2135C4.58284 11.8614 4.44629 11.5238 4.20353 11.2748C3.96077 11.0258 3.63162 10.8858 3.2883 10.8854C3.23161 10.8854 3.17547 10.874 3.1231 10.8517C3.07072 10.8295 3.02313 10.7969 2.98305 10.7557C2.94296 10.7146 2.91117 10.6658 2.88948 10.6121C2.86779 10.5584 2.85664 10.5008 2.85666 10.4427V5.13017C2.85664 5.07203 2.86779 5.01445 2.88948 4.96073C2.91117 4.90701 2.94296 4.8582 2.98305 4.81709C3.02313 4.77598 3.07072 4.74337 3.1231 4.72113C3.17547 4.69888 3.23161 4.68744 3.2883 4.68746C3.63162 4.68708 3.96077 4.54703 4.20353 4.29804C4.44629 4.04905 4.58284 3.71146 4.58322 3.35933C4.5832 3.30119 4.59436 3.24362 4.61604 3.1899C4.63773 3.13618 4.66952 3.08737 4.70961 3.04626C4.74969 3.00515 4.79728 2.97254 4.84966 2.95029C4.90203 2.92805 4.95817 2.91661 5.01486 2.91663H9.11523C9.22971 2.91663 9.3395 2.96327 9.42045 3.04629C9.5014 3.12932 9.54688 3.24192 9.54688 3.35933C9.54688 3.47675 9.5014 3.58935 9.42045 3.67238C9.3395 3.7554 9.22971 3.80204 9.11523 3.80204Z"
                            fill="#197FB6"
                          ></path>
                          <path
                            d="M13 11.5495C12.2744 11.5495 11.565 11.3288 10.9616 10.9153C10.3583 10.5018 9.88803 9.91411 9.61034 9.22651C9.33264 8.5389 9.25999 7.78229 9.40155 7.05233C9.54312 6.32238 9.89255 5.65187 10.4057 5.1256C10.9188 4.59933 11.5725 4.24094 12.2842 4.09574C12.9959 3.95055 13.7336 4.02507 14.404 4.30988C15.0745 4.5947 15.6475 5.07701 16.0506 5.69584C16.4538 6.31466 16.6689 7.04221 16.6689 7.78646C16.6678 8.78412 16.2809 9.74059 15.5931 10.446C14.9053 11.1515 13.9727 11.5483 13 11.5495ZM13 4.90886C12.4451 4.90886 11.9026 5.07762 11.4413 5.39382C10.9799 5.71002 10.6203 6.15944 10.4079 6.68525C10.1955 7.21106 10.14 7.78965 10.2482 8.34785C10.3565 8.90605 10.6237 9.41879 11.0161 9.82123C11.4085 10.2237 11.9084 10.4977 12.4526 10.6088C12.9969 10.7198 13.561 10.6628 14.0737 10.445C14.5863 10.2272 15.0245 9.85839 15.3328 9.38517C15.6411 8.91195 15.8057 8.3556 15.8057 7.78646C15.8048 7.02354 15.5089 6.29212 14.983 5.75266C14.457 5.21319 13.7438 4.90973 13 4.90886Z"
                            fill="#197FB6"
                          ></path>
                          <path
                            d="M1.12988 16.1979H24.8701C24.9846 16.1979 25.0944 16.2445 25.1753 16.3275C25.2563 16.4106 25.3018 16.5232 25.3018 16.6406C25.3018 16.758 25.2563 16.8706 25.1753 16.9536C25.0944 17.0367 24.9846 17.0833 24.8701 17.0833H1.12988C1.0154 17.0833 0.905615 17.0367 0.824667 16.9536C0.743719 16.8706 0.698242 16.758 0.698242 16.6406C0.698242 16.5232 0.743719 16.4106 0.824667 16.3275C0.905615 16.2445 1.0154 16.1979 1.12988 16.1979Z"
                            fill="#197FB6"
                          ></path>
                          <path
                            d="M1.12988 18.4115H24.8701C24.9846 18.4115 25.0944 18.4581 25.1753 18.5412C25.2563 18.6242 25.3018 18.7368 25.3018 18.8542C25.3018 18.9716 25.2563 19.0842 25.1753 19.1672C25.0944 19.2503 24.9846 19.2969 24.8701 19.2969H1.12988C1.0154 19.2969 0.905615 19.2503 0.824667 19.1672C0.743719 19.0842 0.698242 18.9716 0.698242 18.8542C0.698242 18.7368 0.743719 18.6242 0.824667 18.5412C0.905615 18.4581 1.0154 18.4115 1.12988 18.4115Z"
                            fill="#197FB6"
                          ></path>
                        </svg>
                        <div>
                          <span className="font-medium text-[0.9rem]">
                            Thanh toán khi giao hàng (COD)
                          </span>
                        </div>
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        className="peer hidden"
                        id="radio_2"
                        type="radio"
                        name="radio"
                      />
                      <span className="peer-checked:border-[#197FB6] absolute right-4 top-1/2 box-content block h-2.5 w-2.5 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                      <label
                        className="peer-checked:border-1 peer-checked:border-[#197FB6] items-center gap-[10px] peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                        htmlFor="radio_2"
                      >
                        <svg
                          width="23"
                          height="20"
                          viewBox="0 0 23 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M22.5 19.7259H0.5C0.2235 19.7259 0 19.5078 0 19.2381C0 18.9683 0.2235 18.7502 0.5 18.7502H22.5C22.7765 18.7502 23 18.9683 23 19.2381C23 19.5078 22.7765 19.7259 22.5 19.7259ZM7.5 14.8478C7.7765 14.8478 8 15.0659 8 15.3356C8 15.6054 7.7765 15.8234 7.5 15.8234H3.5C3.2235 15.8234 3 15.6054 3 15.3356C3 15.0659 3.2235 14.8478 3.5 14.8478H4V8.50634H3.5C3.2235 8.50634 3 8.28829 3 8.01854C3 7.74927 3.2235 7.53073 3.5 7.53073H7.5C7.7765 7.53073 8 7.74927 8 8.01854C8 8.28829 7.7765 8.50634 7.5 8.50634H7V14.8478H7.5ZM6 8.50634H5V14.8478H6V8.50634ZM13.5 14.8478C13.7765 14.8478 14 15.0659 14 15.3356C14 15.6054 13.7765 15.8234 13.5 15.8234H9.5C9.2235 15.8234 9 15.6054 9 15.3356C9 15.0659 9.2235 14.8478 9.5 14.8478H10V8.50634H9.5C9.2235 8.50634 9 8.28829 9 8.01854C9 7.74927 9.2235 7.53073 9.5 7.53073H13.5C13.7765 7.53073 14 7.74927 14 8.01854C14 8.28829 13.7765 8.50634 13.5 8.50634H13V14.8478H13.5ZM12 8.50634H11V14.8478H12V8.50634ZM21.5 17.2868C21.5 17.5566 21.2765 17.7746 21 17.7746H2C1.7235 17.7746 1.5 17.5566 1.5 17.2868C1.5 17.0171 1.7235 16.799 2 16.799H21C21.2765 16.799 21.5 17.0171 21.5 17.2868ZM19.5 14.8478C19.7765 14.8478 20 15.0659 20 15.3356C20 15.6054 19.7765 15.8234 19.5 15.8234H15.5C15.2235 15.8234 15 15.6054 15 15.3356C15 15.0659 15.2235 14.8478 15.5 14.8478H16V8.50634H15.5C15.2235 8.50634 15 8.28829 15 8.01854C15 7.74927 15.2235 7.53073 15.5 7.53073H19.5C19.7765 7.53073 20 7.74927 20 8.01854C20 8.28829 19.7765 8.50634 19.5 8.50634H19V14.8478H19.5ZM18 8.50634H17V14.8478H18V8.50634ZM1 5.57951L11.5 0L22 5.57951V6.55512H1V5.57951ZM19.7705 5.57951L11.5 1.40781L3.198 5.57951H19.7705Z"
                            fill="#197FB6"
                          ></path>
                        </svg>
                        <div>
                          <span className="font-medium text-[0.9rem]">
                            Chuyển khoản ngân hàng
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-[30px] flex justify-between">
                <button className="text-[0.9rem] rounded-md bg-[#197FB6] px-4 py-2 font-medium text-white">
                  Đặt hàng
                </button>

                <Link
                  href={"/cart"}
                  className="text-[0.95rem] rounded-md bg-transparent py-2 font-medium text-[#338dbc] hover:text-blue-400"
                >
                  Giỏ hàng
                </Link>
              </div>
            </div>

            <div className="order-first lg:order-last">
              <div>
                <p className="text-xl font-medium  mb-[15px]">Đơn hàng</p>
                <div className="space-y-5.5 bg-white">
                  <div className="flex rounded-lg bg-white gap-[15px]">
                    <div className="relative">
                      <img
                        className="w-[120px] object-cover"
                        src="/assets/products/IMGSP3483.png"
                        alt=""
                      />
                      <span className="absolute flex items-center justify-center    top-[-9px] right-[-11px]    bg-[#197FB6] text-white text-[0.85rem] font-medium leading-none    rounded-full w-[25px] h-[25px]">
                        3
                      </span>
                    </div>

                    <div className="flex w-full flex-col my-auto gap-[5px]">
                      <span className="font-semibold text-[0.9rem]">
                        Áo sơ mi ewhiehiwhiheiw
                      </span>
                      <span className="float-right text-[0.9rem] text-gray-500">
                        M / Đen
                      </span>
                      <p className="text-[0.95rem] font-medium">150,000₫</p>
                    </div>
                  </div>

                  <div className="flex rounded-lg bg-white gap-[15px]">
                    <div className="relative">
                      <img
                        className="w-[120px] object-cover"
                        src="/assets/products/IMGSP3483.png"
                        alt=""
                      />
                      <span className="absolute flex items-center justify-center    top-[-9px] right-[-11px]    bg-[#197FB6] text-white text-[0.85rem] font-medium leading-none    rounded-full w-[25px] h-[25px]">
                        3
                      </span>
                    </div>

                    <div className="flex w-full flex-col my-auto gap-[5px]">
                      <span className="font-semibold text-[0.9rem]">
                        Áo sơ mi ewhiehiwhiheiw
                      </span>
                      <span className="float-right text-[0.9rem] text-gray-500">
                        M / Đen
                      </span>
                      <p className="text-[0.95rem] font-medium">150,000₫</p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-slate-300 my-[20px]" />

              <div className="">
                <label
                  htmlFor="discount"
                  className="block text-[1rem] font-medium mb-[5px]"
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

              <div>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between text-[1rem] font-medium mb-[15px]">
                    <p className=" text-gray-600">Tạm tính</p>
                    <p className=" text-gray-600">150,000₫</p>
                  </div>
                  <div className="flex items-center justify-between text-[1rem] font-medium">
                    <p className=" text-gray-600">Phí ship</p>
                    <p className=" text-gray-600">20,000₫</p>
                  </div>

                  <hr className="border-slate-300 my-[20px]" />
                </div>
                <div className="flex items-center justify-between text-[1.2rem] font-medium">
                  <p className=" text-gray-900">Tổng cộng</p>
                  <p className=" text-gray-900">170,000₫</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CheckoutForm;
