"use client";
import { useRouter } from "next/navigation";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
interface Props {
  totalPages: number;
  currentPage: number;
  limit: number;
  totalItems: number;
}
function Pagination({ totalPages, currentPage, limit, totalItems }: Props) {
  const router = useRouter();
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(start + limit - 1, totalItems);

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
          <div className="flex gap-2 items-center">
            Số dòng mỗi trang
            <select
              value={limit}
              onChange={(e) => {
                router.push(`?page=1&limit=${e.target.value}`);
              }}
              className="p-1 border border-gray-300 focus:border-black text-[0.9rem]"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>
          </div>

          <div>
            <p>
              {start}-{end} của {totalItems}
            </p>
          </div>

          <div>
            <nav
              className="isolate inline-flex gap-0.5"
              aria-label="Pagination"
            >
              <button
                type="button"
                className="h-8.5 w-8.5 inline-flex justify-center items-center gap-x-2 text-[0.9rem] text-gray-800 border border-gray-300"
                aria-label="Previous"
                title="Previous"
                disabled={currentPage <= 1}
                onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
              >
                <GrFormPrevious />
              </button>

              {getPageNumbers().map((page, index) => {
                if (page === "...") {
                  return (
                    <button
                      type="button"
                      disabled
                      key={`ellipsis-${index}`}
                      className="group h-8.5 w-8.5 flex justify-center items-center text-gray-600 dark:text-neutral-500 text-[0.85rem] border border-gray-300"
                    >
                      ...
                    </button>
                  );
                }

                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page as number)}
                    className={`h-8.5 w-8.5 flex justify-center items-center text-gray-800 text-[0.85rem] border border-gray-300 ${
                      currentPage === page
                        ? "bg-[#22BAA0] text-white"
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
                className="h-8.5 w-8.5 inline-flex justify-center items-center gap-x-2 text-[0.9rem] border border-gray-300 text-gray-800"
              >
                <GrFormNext />
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Pagination;
