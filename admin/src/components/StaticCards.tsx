import React from "react";
type ArrayProps = {
  title: string;
  number: number | string;
  icon1: React.ReactNode;
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
          className="relative break-words rounded-lg border border-gray-200 h-[18vh] flex items-center justify-between px-4 bg-white"
        >
          <div className="space-y-2">
            <p className="font-medium">{item.title}</p>
            <h4 className="font-semibold">{item.number}</h4>
          </div>

          <div>{item.icon1}</div>
        </div>
      ))}
    </div>
  );
}

export default StaticCards;
