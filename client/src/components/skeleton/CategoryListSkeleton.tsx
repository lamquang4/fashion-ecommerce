type Props = {
  count: number;
};

function CategoryListSkeleton({ count }: Props) {
  return (
    <div className="flex gap-6 overflow-hidden justify-center">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col items-center space-y-2">
          <div className="w-[110px] sm:w-[130px] aspect-square rounded-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export default CategoryListSkeleton;
