"use client";
import useGetCollectionBanners from "@/hooks/useGetCollectionBanners";
import Image from "../Image";
import Link from "next/link";
function CollectionBanner() {
  const { collections } = useGetCollectionBanners();

  return (
    <>
      {collections.length > 0 && (
        <section className="mb-[40px]">
          <div className="mx-auto max-w-[1230px] w-full px-[10px] sm:px-[15px]">
            <h2 className="mb-[20px] font-semibold">Bộ sưu tập</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[20px]">
              <div className="relative">
                <Image
                  Src={collections[0].image}
                  Alt={""}
                  ClassName={"w-full"}
                  loadingType="lazy"
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
              <div className="relative">
                <Image
                  Src={collections[1].image}
                  Alt={""}
                  ClassName={"w-full"}
                  loadingType="lazy"
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
          </div>
        </section>
      )}
    </>
  );
}

export default CollectionBanner;
