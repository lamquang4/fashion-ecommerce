import Category from "@/components/category/Category";
import LayoutPage from "../../components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <Category />
      </Suspense>
    </LayoutPage>
  );
}
