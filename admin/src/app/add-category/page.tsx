import AddCategory from "@/components/category/AddCategory";
import LayoutPage from "../../components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <AddCategory />
      </Suspense>
    </LayoutPage>
  );
}
