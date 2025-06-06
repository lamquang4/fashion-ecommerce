"use client";
import React, { useState } from "react";
import { FaSortDown } from "react-icons/fa";
type ArrayProps = {
  name: string;
  status: number | null;
};
type FilterDropDownMenuProps = {
  title: string;
  array: ArrayProps[];
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
        <div className="absolute bg-[#f9f9f9] z-10 top-[90%] left-0 w-full shadow-sm font-medium">
          {array.map((item, index) => (
            <button
              className="text-black px-3 py-2.5 block w-full text-left"
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
