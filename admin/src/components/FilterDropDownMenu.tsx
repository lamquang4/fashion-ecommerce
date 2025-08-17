"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { memo, useState } from "react";
import { FaSortDown } from "react-icons/fa";
type ArrayProps = {
  name: string;
  status: number | null;
  type?: number | null;
};
type FilterDropDownMenuProps = {
  title: string;
  array: ArrayProps[];
  paramName: string;
};

function FilterDropDownMenu({
  title,
  array,
  paramName,
}: FilterDropDownMenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const currentValue = searchParams.get(paramName);

  const handleClick = (value: number | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== null) {
      params.set(paramName, value.toString());
    } else {
      params.delete(paramName);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className=" cursor-pointer flex items-center gap-[2px] relative w-full"
    >
      {title} <FaSortDown size={14} />
      {isOpen && (
        <div className="bg-white absolute border border-gray-300 z-10 top-full left-0 flex flex-col shadow-md font-medium">
          {array.map((item, index) => {
            const isActive =
              currentValue ===
              (item.status !== null ? item.status.toString() : null);
            return (
              <button
                key={index}
                onClick={() => handleClick(item.status)}
                className={`w-full text-left px-3 py-2.5 ${
                  isActive ? "bg-[#E9EDF2]" : ""
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default memo(FilterDropDownMenu);
