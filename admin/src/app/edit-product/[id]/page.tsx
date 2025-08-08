import EditProduct from "@/components/EditProduct";
import LayoutPage from "@/components/LayoutPage";
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
