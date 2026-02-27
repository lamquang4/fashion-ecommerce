import React from "react";
type Props = {
  count: number;
};
function AddressListSkeleton({ count }: Props) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="border-t border-gray-300 py-[20px]">
          <div className="flex justify-between flex-wrap gap-y-[8px]">
            <div className="flex flex-col gap-[10px] w-full sm:w-2/3">
              <div className="h-4 w-64 bg-gray-200 rounded" />
              <div className="h-4 w-48 bg-gray-200 rounded" />
              <div className="h-4 w-80 bg-gray-200 rounded" />
            </div>

            <div className="flex gap-[25px] items-center">
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-4 w-12 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default AddressListSkeleton;
