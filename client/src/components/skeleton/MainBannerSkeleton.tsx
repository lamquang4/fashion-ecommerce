function MainBannerSkeleton() {
  return (
    <section className="mb-[40px]">
      <div className="relative w-full h-[500px] bg-gray-200 animate-pulse">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
          <div className="h-6 w-48 bg-gray-300 mx-auto mb-6 rounded" />
          <div className="flex gap-7 justify-center">
            <div className="h-8 w-20 bg-gray-300 rounded" />
            <div className="h-8 w-20 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainBannerSkeleton;
