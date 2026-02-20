import React from "react";
import Image from "../components/ui/Image";
import Link from "next/link";
function NotFoundPage() {
  return (
    <>
      <section className="my-[40px] px-[15px]">
        <div className="mx-auto max-w-[1230px] w-full">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="flex flex-col justify-center items-center gap-[15px]">
              <Image
                src={"/assets/other/404-error.png"}
                alt={""}
                className={"w-[230px]"}
                loading="eager"
              />

              <div className="flex justify-center flex-col gap-[15px] items-center text-center">
                <h4 className="uppercase">Trang không tìm thấy</h4>

                <Link
                  className="text-[0.9rem] border border-black rounded-md font-medium px-3 py-2 hover:bg-black hover:text-white"
                  href={"/"}
                >
                  Về trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFoundPage;
