"use client";
import { useRouter } from "next/navigation";
interface Props {
  totalPages: number;
  currentPage: number;
  limit: number;
  totalItems: number;
}
function Pagination({ totalPages, currentPage, limit, totalItems }: Props) {
  const router = useRouter();

  const goToPage = (page: number) => {
    router.push(`?page=${page}&limit=${limit}`);
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  return (
    <>
      {totalItems > 0 && (
        <div className="flex items-center justify-center bg-white px-[15px] py-3 w-full my-[20px] flex-wrap gap-5 sm:gap-3 text-[0.9rem]">
          <nav
            className="isolate inline-flex gap-2 rounded shadow-xs"
            aria-label="Pagination"
          >
            <button
              disabled={currentPage <= 1}
              onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
              className="relative inline-flex items-center rounded px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
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
            </button>

            {getPageNumbers().map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="relative inline-flex items-center px-4 py-2 text-[0.9rem] font-medium text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0"
                  >
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={page}
                  onClick={() => goToPage(page as number)}
                  className={`relative inline-flex items-center px-4 py-2 text-[0.9rem] font-medium ring-1 ring-gray-300 ring-inset ${
                    currentPage === page
                      ? "bg-black text-white"
                      : "text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              disabled={currentPage >= totalPages}
              onClick={() =>
                currentPage < totalPages && goToPage(currentPage + 1)
              }
              className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
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
            </button>
          </nav>
        </div>
      )}
    </>
  );
}

export default Pagination;
