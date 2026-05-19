"use client";
import Pagination from "../ui/Pagination";
import useGetSizes from "@/hooks/useGetSizes";
import InputSearch from "../ui/InputSearch";
import ListHeader from "../ui/list/ListHeader";
import SizeTable from "./SizeTable";
function SizeList() {
  const {
    sizes,
    mutate,
    isLoading,
    totalPages,
    totalItems,
    currentPage,
    limit,
  } = useGetSizes();

  return (
    <>
      <ListHeader
        title="Kích thước"
        totalItems={totalItems}
        addLink="/add-size"
      />

      <div className="bg-white w-full overflow-auto">
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <SizeTable sizes={sizes} isLoading={isLoading} mutate={mutate} />
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        limit={limit}
        totalItems={totalItems}
      />
    </>
  );
}

export default SizeList;
