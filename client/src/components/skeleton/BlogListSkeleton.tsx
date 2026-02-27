import { memo } from "react";

type Props = {
  count: number;
};

function BlogListSkeleton({ count }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-md shadow-md overflow-hidden animate-pulse"
        >
          <div className="w-full aspect-[16/9] bg-gray-200" />

          <div className="flex flex-col space-y-3 py-6 px-[15px]">
            <div className="h-[18px] w-[80%] bg-gray-200 rounded" />

            <div className="space-y-2">
              <div className="h-[14px] w-full bg-gray-200 rounded" />
              <div className="h-[14px] w-[90%] bg-gray-200 rounded" />
              <div className="h-[14px] w-[75%] bg-gray-200 rounded" />
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="h-[14px] w-[100px] bg-gray-200 rounded" />
              <div className="h-[14px] w-[70px] bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(BlogListSkeleton);
