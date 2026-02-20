"use client";
import { useParams, usePathname } from "next/navigation";
import useGetProductsSale from "@/hooks/useGetProductsSale";
import Pagination from "@/components/ui/Pagination";
import ProductList from "./ProductList";
import BreadCrumb from "../ui/BreadCrumb";

function ProductSale() {
  const params = useParams();
  const slug = params.slug as string;
  const pathname = usePathname();

  const { products, totalPages, totalItems, currentPage, isLoading } =
    useGetProductsSale(slug);

  const getTitle = () => {
    if (pathname === "/sale/nam") return "Giảm giá đồ nam";
    if (pathname === "/sale/nu") return "Giảm giá đồ nữ";
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

export default ProductSale;
