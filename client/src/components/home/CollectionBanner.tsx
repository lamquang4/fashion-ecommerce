"use client";
import Image from "../ui/Image";
import Link from "next/link";
import { Banner } from "@/types/type";
import CollectionBannerSkeleton from "../skeleton/CollectionBannerSkeleton";
type Props = {
  banners: Banner[];
  isLoading: boolean;
};
function CollectionBanner({ banners, isLoading }: Props) {
  return (
    <>
      <section className="mb-[40px]  px-[15px]">
        <div className="mx-auto max-w-[1230px] w-full">
          <h2 className="mb-[20px] font-semibold">Bộ sưu tập</h2>

          {isLoading ? (
            <CollectionBannerSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[20px]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={banners[0].image}
                  alt={""}
                  className={"w-full"}
                  loading="lazy"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                  <h2 className="mb-[10px]">NAM</h2>
                  <Link
                    className="text-[0.9rem] border border-white p-2 font-medium hover:scale-105"
                    href={"/collection/nam"}
                  >
                    KHÁM PHÁ NGAY
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={banners[1].image}
                  alt={""}
                  className={"w-full"}
                  loading="lazy"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                  <h2 className="mb-[10px]">NỮ</h2>
                  <Link
                    className="text-[0.9rem] border border-white p-2 font-medium hover:scale-105"
                    href={"/collection/nu"}
                  >
                    KHÁM PHÁ NGAY
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default CollectionBanner;
