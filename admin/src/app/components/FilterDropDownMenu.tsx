"use client";
import React, { useState } from "react";
import { FaSortDown } from "react-icons/fa";

type FilterDropDownMenuProps = {
  title: string;
  array: Array<any>;
};

function FilterDropDownMenu({ title, array }: FilterDropDownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="py-[1rem] cursor-pointer flex items-center gap-[2px] relative w-full"
    >
      {title} <FaSortDown size={14} />
      {isOpen && (
        <div className="absolute bg-[#f9f9f9] z-10 top-[90%] left-0 w-full min-w-max shadow-sm font-medium">
          {array.map((item, index) => (
            <button
              className="text-black px-4 py-3 block w-full text-left"
              key={index}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </span>
  );
}

export default FilterDropDownMenu;
