import React from "react";
type ArrayProps = {
  title: string;
  number: number | string;
  icon1: React.ReactNode;
  icon2: React.ReactNode;
  percent: number;
};

type StaticCardsProp = {
  array: ArrayProps[];
};
function StaticCards({ array }: StaticCardsProp) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
      {array.map((item, index) => (
        <div
          key={index}
          className="relative break-words rounded-lg border border-gray-200 dark:border-dark-600 flex justify-between p-5 bg-white"
        >
          <div>
            <p>{item.title}</p>
            <p className="mt-0.5 text-xl font-medium">{item.number}</p>
            <p
              className={`mt-3 flex items-center ${
                item.percent < 0 ? "text-red-500" : "text-[#029A67]"
              } `}
            >
              {item.icon2}
              <span>{item.percent}%</span>
            </p>
          </div>

          <div className="relative inline-flex shrink-0">
            <div className="flex h-full w-full select-none items-center justify-center font-medium uppercase  rounded-none">
              {item.icon1}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StaticCards;
