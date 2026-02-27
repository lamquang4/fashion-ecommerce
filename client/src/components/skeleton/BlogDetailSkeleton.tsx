function BlogDetailSkeleton() {
  return (
    <section className="mb-[40px] relative px-[15px] animate-pulse">
      <div className="w-full max-w-[1230px] mx-auto">
        <div className="main-prose">
          <div className="h-8 bg-gray-300 rounded w-2/3 mb-4" />

          <div className="h-4 bg-gray-200 rounded w-40 mb-4" />

          <div className="h-[1px] bg-gray-200 my-4" />
        </div>

        <div className="flex gap-[25px] flex-wrap">
          <div className="order-2 lg:order-1 relative lg:flex-1 space-y-4">
            <div className="h-5 bg-gray-200 rounded w-3/4" />
            <div className="h-5 bg-gray-200 rounded w-full" />
            <div className="h-5 bg-gray-200 rounded w-full" />
            <div className="h-5 bg-gray-200 rounded w-5/6" />

            <div className="h-6 bg-gray-300 rounded w-1/2 mt-6" />

            <div className="space-y-3 mt-4">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-4/5" />
            </div>
          </div>

          <div className="order-1 lg:order-2 border border-gray-200 w-full lg:w-[300px] rounded-md p-3 space-y-3">
            <div className="h-5 bg-gray-300 rounded w-1/2" />

            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
              <div className="h-4 bg-gray-200 rounded w-3/6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogDetailSkeleton;
