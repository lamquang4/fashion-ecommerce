type Props = {
  count: number;
};
function WishlistItemListSkeleton({ count }: Props) {
  return (
    <div className="flex gap-8 lg:max-w-xl mx-auto w-full">
      <div className="flex flex-col gap-5 bg-white basis-full">
        {[...Array(count)].map((_, index) => (
          <div key={index} className="flex w-full gap-4">
            <div className="w-full max-w-[270px] h-[180px] bg-gray-200 rounded shrink-0" />

            <div className="flex justify-between gap-4 w-full">
              <div className="flex flex-col gap-3 w-full">
                <div className="h-5 bg-gray-300 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>

              <div className="w-6 h-6 bg-gray-300 rounded-full mb-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistItemListSkeleton;
