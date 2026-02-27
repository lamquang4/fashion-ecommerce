type Props = {
  count: number;
};
function ProductBuyListSkeleton({ count }: Props) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex rounded-lg bg-white gap-[15px] animate-pulse"
        >
          <div className="relative">
            <div className="w-[120px] h-[120px] bg-gray-200 rounded-md" />

            <div className="absolute top-[-7px] right-[-9px] w-[25px] h-[25px] bg-gray-300 rounded-full" />
          </div>

          <div className="flex w-full flex-col my-auto gap-[8px]">
            <div className="h-5 w-3/4 bg-gray-200 rounded" />

            <div className="h-4 w-1/2 bg-gray-200 rounded" />

            <div className="h-5 w-1/3 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </>
  );
}

export default ProductBuyListSkeleton;
