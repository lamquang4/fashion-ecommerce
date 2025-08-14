import React from "react";
import Image from "../components/Image";
import Link from "next/link";
function NotFoundPage() {
  return (
    <>
      <section className="px-[10px] my-[40px] sm:my-[45px] sm:px-[15px]">
        <div className="w-full mx-auto md:max-w-[1000px] lg:max-w-[1240px]">
          <div className="flex justify-center items-center h-[60vh]">
            <div>
              <div className="mb-[20px] flex justify-center">
                <Image
                  Src={"/assets/other/404-error.png"}
                  Alt={""}
                  ClassName={"w-[250px]"}
                  loadingType="eager"
                />
              </div>

              <div className="flex justify-center flex-col gap-3 items-center text-center">
                <h2 className="text-[1.3rem] font-semibold uppercase">
                  TRANG KHÔNG ĐƯỢC TÌM THẤY
                </h2>
                <button className="text-[0.95rem] border border-black rounded-md font-medium px-3 py-2 hover:bg-black hover:text-white">
                  <Link href={"/"}>Về trang chủ</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFoundPage;
