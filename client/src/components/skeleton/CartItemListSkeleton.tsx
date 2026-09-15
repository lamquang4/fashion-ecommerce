import React from "react";

type Props = {
  count: number;
};

function CartItemListSkeleton({ count }: Props) {
  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      <div className="basis-[60%] space-y-4 bg-white py-6">
        {Array.from({ length: count }).map((_, index) => (
          <React.Fragment key={index}>
            <div className="relative w-full animate-pulse space-y-4">
              <div className="flex w-full min-w-0 gap-4">
                <div className="aspect-square w-[180px] shrink-0 bg-gray-200" />

                <div className="flex w-full min-w-0 flex-col gap-4">
                  <div className="flex justify-between gap-4">
                    <div className="flex min-w-0 flex-col gap-4">
                      <div className="h-5 w-3/4 rounded bg-gray-200" />

                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-16 rounded bg-gray-200" />
                          <div className="h-5.5 w-5.5 shrink-0 rounded-full bg-gray-200" />
                        </div>

                        <div className="h-4 w-24 rounded bg-gray-200" />
                      </div>

                      <div className="h-4 w-28 rounded bg-gray-200" />
                    </div>

                    <div className="h-5 w-5 shrink-0 rounded bg-gray-200" />
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-1">
                      <div className="h-7 w-7 bg-gray-200" />
                      <div className="h-7 w-7 bg-gray-200" />
                      <div className="h-7 w-7 bg-gray-200" />
                    </div>

                    <div className="h-5 w-28 rounded bg-gray-200" />
                  </div>
                </div>
              </div>

              <div className="h-5 w-3/4 rounded bg-gray-200" />
            </div>

            {index < count - 1 && <hr className="border-gray-300" />}
          </React.Fragment>
        ))}
      </div>

      <div className="basis-[40%] space-y-6 rounded-sm bg-[#F7F7F7] px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="h-5 w-1/3 rounded bg-gray-200" />
          <div className="h-6 w-1/4 rounded bg-gray-200" />
        </div>

        <hr className="border-gray-300" />

        <div className="flex flex-col gap-3">
          <div className="h-10 w-full rounded-md bg-gray-200" />
          <div className="h-10 w-full rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default CartItemListSkeleton;
