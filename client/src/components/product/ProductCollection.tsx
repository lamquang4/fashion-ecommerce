"use client";
import useGetCategory from "@/hooks/useGetCategory";
import { useParams } from "next/navigation";
import Pagination from "../Pagination";
import ProductList from "./ProductList";
import useGetProductsCollection from "@/hooks/useGetProductsCollection";
import BreadCrumb from "../BreadCrumb";

function ProductCollection() {
  const params = useParams();
  const slug = params.slug as string;

  const { category, isLoading: isLoadingCategory } = useGetCategory(slug);

  const {
    products,
    totalPages,
    totalItems,
    currentPage,
    isLoading: isLoadingProducts,
  } = useGetProductsCollection(slug);

  const getTitle = () => {
    if (category) {
      return `${category.namecategory} ${
        category.gender === 1 ? "nam" : category.gender === 0 ? "nữ" : ""
      }`;
    }
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
            category={category}
            isLoading={isLoadingCategory || isLoadingProducts}
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

export default ProductCollection;
