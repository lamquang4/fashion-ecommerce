import LayoutPage from "@/components/LayoutPage";
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
