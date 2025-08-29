"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
interface Props {
  totalPages: number;
  currentPage: number;
  totalItems: number;
}
function Pagination({ totalPages, currentPage, totalItems }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    router.push(`${pathname}?${params.toString()}`);
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
        <div className="mt-[20px]">
          <div className="flex items-center justify-center px-[10px] sm:px-[15px] w-full flex-wrap gap-2">
            <button
              type="button"
              className="h-8.5 w-8.5 flex justify-center items-center rounded-full border  "
              disabled={currentPage <= 1}
              onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
            >
              <GrFormPrevious size={20} />
            </button>

            {getPageNumbers().map((page, index) => {
              if (page === "...") {
                return (
                  <button
                    type="button"
                    disabled
                    key={`ellipsis-${index}`}
                    className="group h-8.5 border w-8.5 flex justify-center items-center rounded-full text-[0.9rem] font-medium"
                  >
                    ...
                  </button>
                );
              }

              return (
                <button
                  key={page}
                  onClick={() => goToPage(page as number)}
                  className={`h-8.5 w-8.5 border flex justify-center items-center text-[0.9rem] font-medium rounded-full ${
                    currentPage === page
                      ? "bg-black text-white"
                      : "  hover:bg-gray-50"
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
              className="h-8.5 w-8.5 flex justify-center items-center rounded-full border  "
            >
              <GrFormNext size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Pagination;
