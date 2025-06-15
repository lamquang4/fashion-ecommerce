"use client";
import Link from "next/link";
import { useState } from "react";

function Pagination() {
  const pageLimit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * pageLimit;
  const endIndex = startIndex + pageLimit;
 // const totalPages = Math.ceil(data.length / pageLimit);
  // const currentDisplayData=data.slice(startIndex, endIndex);

  return (
    <div className="flex items-center justify-center bg-white px-[15px] py-3 w-full my-[20px] flex-wrap gap-5 sm:gap-3 text-[0.9rem]">
      <div className="flex gap-2 items-center">
        Số dòng mỗi trang
        <select className="p-1 border border-gray-300 focus:border-black text-[0.9rem]">
          <option>10</option>
          <option>20</option>
          <option>30</option>
          <option>50</option>
        </select>
      </div>

      <div>
        <p>1-10 của 1000</p>
      </div>

      <div>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-xs"
          aria-label="Pagination"
        >
          <Link
            href="#"
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="size-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fillRule="evenodd"
                d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>

          <Link
            href="#"
            aria-current="page"
            className="relative z-10 inline-flex items-center bg-[#22BAA0] px-4 py-2 text-[0.9rem] font-medium text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            1
          </Link>
          <Link
            href="#"
            className="relative inline-flex items-center px-4 py-2 text-[0.9rem] font-medium text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            2
          </Link>
          <Link
            href="#"
            className="relative hidden items-center px-4 py-2 text-[0.9rem] font-medium text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
          >
            3
          </Link>
          <span className="relative inline-flex items-center px-4 py-2 text-[0.9rem] font-medium text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0">
            ...
          </span>
          <Link
            href="#"
            className="relative hidden items-center px-4 py-2 text-[0.9rem] font-medium text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
          >
            8
          </Link>

          <Link
            href="#"
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Next</span>
            <svg
              className="size-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fillRule="evenodd"
                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Pagination;
