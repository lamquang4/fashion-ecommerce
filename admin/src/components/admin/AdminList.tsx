"use client";
import Pagination from "../ui/Pagination";
import InputSearch from "../ui/InputSearch";
import ListHeader from "../ui/list/ListHeader";
import ListBody from "../ui/list/ListBody";
import useGetAdmins from "@/hooks/useGetAdmins";
import AdminTable from "./AdminTable";

function AdminList() {
  const {
    admins,
    isLoading,
    totalPages,
    totalItems,
    currentPage,
    limit,
    mutate,
  } = useGetAdmins();

  return (
    <>
      <ListHeader
        title="Quản trị viên"
        totalItems={totalItems}
        addLink="/add-admin"
      />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <AdminTable admins={admins} isLoading={isLoading} mutate={mutate} />
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

export default AdminList;
