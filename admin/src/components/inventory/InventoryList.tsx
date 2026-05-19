"use client";
import Pagination from "../ui/Pagination";
import useGetInventories from "@/hooks/useGetInventories";
import InputSearch from "../ui/InputSearch";
import ListHeader from "../ui/list/ListHeader";
import ListBody from "../ui/list/ListBody";
import InventoryTable from "./InventoryTable";
function InventoryList() {
  const {
    inventories,
    totalPages,
    totalItems,
    currentPage,
    limit,
    isLoading,
    totalQuantity,
  } = useGetInventories();

  return (
    <>
      <ListHeader title="Tồn kho" totalItems={totalQuantity} />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <InventoryTable inventories={inventories} isLoading={isLoading} />
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

export default InventoryList;
