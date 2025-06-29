"use client";
import Link from "next/link";
import Image from "./Image";
function WishlistItem() {
  return (
    <>
      <section className="max-w-[1230px] mx-auto  mt-[40px] sm:mt-[45px]">
        <div className=" px-[10px] sm:px-[15px]">
          <h2 className="text-[1.5rem] sm:text-[1.7rem] font-[550] mb-[15px]">
            Yêu thích
          </h2>

          <div className="grid md:grid-cols-1 gap-8 max-w-xl mx-auto">
            <div className="md:col-span-2 bg-white px-2.5 sm:px-4 border border-gray-300 rounded-md">
              <div className="flex gap-4 bg-white py-6">
                <div className="flex gap-4.5">
                  <Link href={"/"}>
                    <div className="w-full max-w-[150px] shrink-0">
                      <Image
                        Src={"/assets/products/IMGSP3483.png"}
                        Alt={""}
                        ClassName={"w-full h-full object-cover"}
                        loadingType="eager"
                      />
                    </div>
                  </Link>

                  <div className="flex flex-col gap-4">
                    <div>
                      <Link
                        href={"/"}
                        className="text-[0.85rem] sm:text-[0.95rem] font-normal text-slate-900"
                      >
                        Áo sơ cổ dài ưewewe
                      </Link>
                      <p className="text-[0.85rem] sm:text-[0.95rem] font-normal mt-2 flex items-center gap-2">
                        Giá:
                        <span className="inline-block">150,000₫</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ml-auto flex flex-col">
                  <div className="flex gap-4 justify-end">
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4.5 h-4.5 cursor-pointer fill-pink-600 hover:fill-slate-400 inline-block"
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <hr className="border-gray-300" />

              <div className="flex gap-4 bg-white py-6">
                <div className="flex gap-4.5">
                  <Link href={"/"}>
                    <div className="w-full max-w-[150px] shrink-0">
                      <Image
                        Src={"/assets/products/IMGSP3483.png"}
                        Alt={""}
                        ClassName={"w-full h-full object-cover"}
                        loadingType="eager"
                      />
                    </div>
                  </Link>

                  <div className="flex flex-col gap-4">
                    <div>
                      <Link
                        href={"/"}
                        className="text-[0.85rem] sm:text-[0.95rem] font-normal text-slate-900"
                      >
                        Áo sơ cổ dài ưewewe
                      </Link>
                      <p className="text-[0.85rem] sm:text-[0.95rem] font-normal mt-2 flex items-center gap-2">
                        Giá:
                        <span className="inline-block">150,000₫</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ml-auto flex flex-col">
                  <div className="flex gap-4 justify-end">
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4.5 h-4.5 cursor-pointer fill-pink-600 hover:fill-slate-400 inline-block"
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*
  <div className="flex justify-center items-center h-[60vh]">
              <div>
                <div className="mb-[20px] flex justify-center">
                  <Image
                    Src={"/assets/other/empty-wishlist.png"}
                    Alt={""}
                    ClassName={"w-[220px]"}
                  />
                </div>

                <div className="flex justify-center flex-col gap-3 items-center text-center">
                  <h2 className="text-[1.3rem] font-semibold">
                    Không có gì trong yêu thích hết
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

export default WishlistItem;
