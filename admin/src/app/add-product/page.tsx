import { Suspense } from "react";
import LayoutPage from "../../components/LayoutPage";
import AddProduct from "@/components/product/AddProduct";

export default function Page() {
  return (
    <LayoutPage>
      <Suspense>
        <AddProduct />
      </Suspense>
    </LayoutPage>
  );
}
