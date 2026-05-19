"use client";
import Pagination from "../ui/Pagination";
import useGetCategories from "@/hooks/useGetCategories";
import InputSearch from "../ui/InputSearch";
import ListHeader from "../ui/list/ListHeader";
import ListBody from "../ui/list/ListBody";
import CategoryTable from "./CategoryTable";
function CategoryList() {
  const {
    categories,
    totalPages,
    totalItems,
    currentPage,
    limit,
    mutate,
    isLoading,
  } = useGetCategories();

  return (
    <>
      <ListHeader
        title="Danh mục"
        totalItems={totalItems}
        addLink="/add-category"
      />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <CategoryTable
          categories={categories}
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

export default CategoryList;
