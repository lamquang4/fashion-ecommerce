"use client";
import Pagination from "@/components/ui/Pagination";
import useGetProductsSearch from "@/hooks/useGetProductsSearch";
import ProductList from "./ProductList";
import { usePathname, useSearchParams } from "next/navigation";
import BreadCrumb from "../ui/BreadCrumb";

function ProductSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const search = searchParams.get("q");

  const { products, totalPages, totalItems, currentPage, isLoading } =
    useGetProductsSearch();

  const getTitle = () => {
    if (pathname === "/search" && search) return search;
    return "";
  };

  const array = [
    {
      name: "Trang chủ",
      href: "/",
    },
    {
      name: getTitle(),
    },
  ];
  return (
    <>
      <BreadCrumb items={array} />

      <section className="px-[15px] mb-[40px]">
        <div className="mx-auto max-w-[1230px] w-full">
          <ProductList
            products={products}
            isLoading={isLoading}
            total={totalItems}
          />

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            totalItems={totalItems}
          />
        </div>
      </section>
    </>
  );
}

export default ProductSearch;
