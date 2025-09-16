"use client";
import { useParams } from "next/navigation";
import useGetProductsSale from "@/hooks/useGetProductsSale";
import Pagination from "@/components/Pagination";
import ProductList from "./ProductList";

function ProductSale() {
  const params = useParams();
  const slug = params.slug as string;

  const { products, totalPages, totalItems, currentPage, isLoading } =
    useGetProductsSale(slug);

  return (
    <section className="my-[40px] px-[10px] sm:px-[15px]">
      <div className="mx-auto max-w-[1230px] w-full">
        <ProductList products={products} isLoading={isLoading} />

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          totalItems={totalItems}
        />
      </div>
    </section>
  );
}

export default ProductSale;
