"use client";
import Pagination from "../ui/Pagination";
import useGetColors from "@/hooks/useGetColors";
import InputSearch from "../ui/InputSearch";
import ListHeader from "../ui/list/ListHeader";
import ListBody from "../ui/list/ListBody";
import ColorTable from "./ColorTable";
function ColorList() {
  const {
    colors,
    mutate,
    isLoading,
    totalPages,
    totalItems,
    currentPage,
    limit,
  } = useGetColors();

  return (
    <>
      <ListHeader title="Màu" totalItems={totalItems} addLink="/add-color" />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <ColorTable colors={colors} isLoading={isLoading} mutate={mutate} />
      </ListBody>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        limit={limit}
        totalItems={totalItems}
      />
    </>
  );
}

export default ColorList;
