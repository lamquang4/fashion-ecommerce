import LayoutPage from "@/components/layout/LayoutPage";
import EditProduct from "@/components/product/EditProduct";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <EditProduct />
      </Suspense>
    </LayoutPage>
  );
}
