"use client";
import { memo } from "react";

type Props = {
  count: number;
};

function ProductListSkeleton({ count }: Props) {
  return (
    <div className="grid grid-cols-2 gap-x-[12px] gap-y-[35px] lg:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2">
      {Array.from({ length: count }).map((_, index) => (
        <div className="space-y-[15px] animate-pulse" key={index}>
          <div className="w-full aspect-[4/5] bg-gray-200" />

          <div className="py-[12px] space-y-[10px]">
            <div className="flex gap-2 mb-[10px]">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="w-5.5 h-5.5 bg-gray-200 rounded-full border-2 border-gray-200"
                />
              ))}
            </div>

            <div className="space-y-2">
              <div className="w-full h-[16px] bg-gray-200 rounded" />
              <div className="w-[75%] h-[16px] bg-gray-200 rounded" />
            </div>

            <div className="w-[60%] h-[14px] bg-gray-200 rounded" />

            <div className="flex gap-[12px]">
              <div className="w-[80px] h-[18px] bg-gray-200 rounded" />
              <div className="w-[90px] h-[18px] bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(ProductListSkeleton);
