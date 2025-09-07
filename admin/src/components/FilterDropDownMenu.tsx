"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { memo, useState } from "react";
import { FaSortDown } from "react-icons/fa";
type ArrayProps = {
  name: string;
  value: number | null;
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

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

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
      onMouseEnter={toggleOpen}
      onMouseLeave={toggleOpen}
      className="relative w-full"
    >
      <div className=" cursor-pointer flex items-center gap-[2px] ">
        {title} <FaSortDown size={14} />
      </div>

      {isOpen && (
        <div className="bg-white absolute border border-gray-300 z-10 top-full left-0 shadow-md font-medium text-[#444]">
          {array.map((item, index) => {
            const isActive =
              currentValue ===
              (item.value !== null ? item.value.toString() : null);
            return (
              <button
                key={index}
                onClick={() => handleClick(item.value)}
                className={`w-full text-left text-[0.9rem] px-3 py-2.5 ${
                  isActive ? "bg-gray-100" : "hover:bg-gray-50"
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
