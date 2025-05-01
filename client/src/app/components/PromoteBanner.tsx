import React from "react";
import Image from "./Image";
import Link from "next/link";

function PromoteBanner() {
  return (
    <section className="px-[10px] mt-[40px] sm:mt-[45px] sm:px-[15px]">
      <div className="w-full mx-auto md:max-w-[1000px] lg:max-w-[1240px]">
        <div className="flex flex-col gap-[20px] sm:gap-[30px]">
          <Link href={"/shop"}>
            <div className="relative">
              <picture>
                <Image
                  Src="assets/banner/banner-promotion.png"
                  Alt=""
                  ClassName="w-full object-cover"
                />
              </picture>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PromoteBanner;
