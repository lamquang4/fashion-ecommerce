import { Suspense } from "react";
import LayoutPage from "../../components/layout/LayoutPage";
import ProductList from "@/components/product/ProductList";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <ProductList />
      </Suspense>
    </LayoutPage>
  );
}
