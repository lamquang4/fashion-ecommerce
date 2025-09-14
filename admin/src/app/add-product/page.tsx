import { Suspense } from "react";
import LayoutPage from "../../components/LayoutPage";
import AddProduct from "@/components/Product/AddProduct";


export default function Page() {
  return (
    <LayoutPage>
      <Suspense>
        <AddProduct />
      </Suspense>
    </LayoutPage>
  );
}
