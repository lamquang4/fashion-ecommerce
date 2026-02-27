"use client";
import { memo } from "react";

function ProductDetailSkeleton() {
  return (
    <section className="w-full mb-[40px] animate-pulse">
      <div className="mx-auto w-full max-w-[1230px] px-[15px]">
        <div className="flex flex-col lg:flex-row gap-x-[15px] gap-y-[30px] w-full">
          <div className="flex flex-1 lg:flex-row flex-col-reverse gap-3">
            <div className="lg:w-[70px] w-full flex lg:flex-col gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-[70px] h-[90px] bg-gray-200 rounded"
                />
              ))}
            </div>

            <div className="flex-1">
              <div className="w-full h-full bg-gray-200 rounded" />
            </div>
          </div>

          <div className="flex-1 space-y-5">
            <div className="w-[200px] h-[18px] bg-gray-200 rounded" />

            <div className="w-[70%] h-[28px] bg-gray-200 rounded" />

            <div className="w-[150px] h-[28px] bg-gray-200 rounded" />

            <div className="space-y-2">
              <div className="w-[120px] h-[18px] bg-gray-200 rounded" />
              <div className="flex gap-2">
                <div className="w-[120px] h-[35px] bg-gray-200 rounded" />
                <div className="w-[120px] h-[35px] bg-gray-200 rounded" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="w-[100px] h-[18px] bg-gray-200 rounded" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-200" />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="w-[150px] h-[18px] bg-gray-200 rounded" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[70px] h-[35px] bg-gray-200 rounded"
                  />
                ))}
              </div>
            </div>

            <div className="w-[8rem] h-[44px] bg-gray-200 rounded" />

            <div className="flex gap-4">
              <div className="flex-1 h-[45px] bg-gray-300 rounded" />
              <div className="flex-1 h-[45px] bg-gray-200 rounded" />
            </div>

            <div className="space-y-2 pt-4">
              <div className="w-[200px] h-[22px] bg-gray-200 rounded" />
              <div className="w-full h-[80px] bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ProductDetailSkeleton);
