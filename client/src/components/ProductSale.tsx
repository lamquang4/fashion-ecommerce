"use client";
import ProductList from "@/components/ProductList";
import { useParams } from "next/navigation";
import useGetProductsSale from "@/hooks/useGetProductsSale";
import Pagination from "@/components/Pagination";

function ProductSale() {
  const params = useParams();
  const slug = params.slug as string;

  const { products, totalPages, totalItems, currentPage, isLoading } =
    useGetProductsSale(slug);

  return (
    <>
      <section className="px-[10px] my-[40px] sm:my-[45px] sm:px-[15px]">
        <ProductList products={products} isLoading={isLoading} />

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          totalItems={totalItems}
        />
      </section>
    </>
  );
}

export default ProductSale;
