type Props = {
  count: number;
};
function WishlistItemListSkeleton({ count }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 bg-white lg:grid-cols-2">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="relative flex w-full gap-4 animate-pulse">
          <div className="flex w-full min-w-0 gap-4">
            <div className="aspect-square w-[180px] shrink-0 bg-gray-200" />

            <div className="flex w-full min-w-0 flex-col items-start justify-between gap-4 sm:flex-row">
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="h-5 w-3/4 rounded bg-gray-200" />

                <div className="flex items-center gap-2">
                  <div className="h-5.5 w-5.5 shrink-0 rounded-full bg-gray-200" />
                  <div className="h-4 w-20 rounded bg-gray-200" />
                </div>
              </div>

              <div className="h-[22px] w-[22px] shrink-0 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WishlistItemListSkeleton;
