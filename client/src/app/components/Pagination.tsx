"use client";
import React from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
function Pagination() {
  return (
    <div className="flex justify-center items-center my-[35px] px-[10px] sm:px-[15px]">
      <nav
        className="flex items-center gap-x-2 font-medium"
        aria-label="Pagination"
      >
        <button
          type="button"
          className="h-8.5 w-8.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-[0.9rem] rounded-lg border text-gray-800 hover:bg-gray-100  dark:text-white dark:hover:bg-white/10"
          aria-label="Previous"
          title="Previous"
        >
          <GrFormPrevious />
        </button>
        <div className="flex items-center gap-x-2">
          <button
            type="button"
            className="h-8.5 w-8.5 flex border justify-center items-center bg-black text-white py-2 px-3 text-[0.9rem] rounded-lg dark:bg-neutral-600 dark:text-white"
            aria-current="page"
          >
            1
          </button>
          <button
            type="button"
            className="h-8.5 w-8.5 border flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-[0.9rem] rounded-lg dark:text-white dark:hover:bg-white/10"
          >
            2
          </button>
          <button
            type="button"
            className="h-8.5 w-8.5 border flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-[0.9rem] rounded-lg dark:text-white dark:hover:bg-white/10"
          >
            3
          </button>
          <div className="hs-tooltip inline-block">
            <button
              type="button"
              className="group h-8.5 border w-8.5 flex justify-center items-center text-gray-600 p-2 rounded-lg  dark:text-neutral-500 "
            >
              <span className="text-xs">•••</span>
            </button>
          </div>
          <button
            type="button"
            className="h-8.5 w-8.5 border flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg dark:text-white dark:hover:bg-white/10"
          >
            8
          </button>
        </div>
        <button
          type="button"
          className="h-8.5 w-8.5 py-2 px-2.5 border inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
          aria-label="Next"
        >
          <GrFormNext />
        </button>
      </nav>
    </div>
  );
}

export default Pagination;
