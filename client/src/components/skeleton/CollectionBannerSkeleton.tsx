function CollectionBannerSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[20px]">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="relative">
          <div className="w-full aspect-[4/5] bg-gray-200 rounded" />

          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3">
            <div className="w-[80px] h-[22px] bg-gray-300 rounded" />
            <div className="w-[130px] h-[32px] bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CollectionBannerSkeleton;
