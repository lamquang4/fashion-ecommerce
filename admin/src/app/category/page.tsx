import CategoryList from "@/components/category/CategoryList";
import LayoutPage from "../../components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <CategoryList />
      </Suspense>
    </LayoutPage>
  );
}
