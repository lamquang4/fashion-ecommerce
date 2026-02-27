type Props = {
  count: number;
};
function WishlistItemListSkeleton({ count }: Props) {
  return (
    <div className="flex gap-8 lg:max-w-xl mx-auto w-full">
      <div className="flex flex-col gap-5 bg-white basis-full">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="flex w-full gap-4 relative animate-pulse">
            <div className="flex gap-4.5 w-full">
              <div className="mx-auto bg-gray-200 w-[200px] h-[200px]" />

              <div className="flex justify-between gap-4 w-full">
                <div className="flex flex-col gap-3 w-full">
                  <div className="h-5 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>

                <div className="h-6 w-6 bg-gray-200 mb-auto" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistItemListSkeleton;
