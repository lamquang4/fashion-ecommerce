import LayoutPage from "@/components/LayoutPage";
import EditProduct from "@/components/Product/EditProduct";
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
