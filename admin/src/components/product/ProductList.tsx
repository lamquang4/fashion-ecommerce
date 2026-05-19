"use client";
import Pagination from "../ui/Pagination";
import useGetProducts from "@/hooks/useGetProducts";
import InputSearch from "../ui/InputSearch";
import ListHeader from "../ui/list/ListHeader";
import ListBody from "../ui/list/ListBody";
import ProductTable from "./ProductTable";
function ProductList() {
  const {
    products,
    mutate,
    isLoading,
    totalPages,
    totalItems,
    currentPage,
    limit,
  } = useGetProducts();

  return (
    <>
      <ListHeader
        title="Sản phẩm"
        totalItems={totalItems}
        addLink="/add-product"
      />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <ProductTable
          products={products}
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

export default ProductList;
