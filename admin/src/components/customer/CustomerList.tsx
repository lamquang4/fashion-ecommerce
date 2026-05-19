"use client";
import Pagination from "../ui/Pagination";
import useGetCustomers from "@/hooks/useGetCustomers";
import InputSearch from "../ui/InputSearch";
import ListHeader from "../ui/list/ListHeader";
import ListBody from "../ui/list/ListBody";
import CustomerTable from "./CustomerTable";
function Customer() {
  const {
    customers,
    mutate,
    isLoading,
    totalPages,
    totalItems,
    currentPage,
    limit,
  } = useGetCustomers();

  return (
    <>
      <ListHeader title="Khách hàng" totalItems={totalItems} />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <CustomerTable
          customers={customers}
          isLoading={isLoading}
          mutate={mutate}
        />
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

export default Customer;
