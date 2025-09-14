import Category from "@/components/Category/Category";
import LayoutPage from "../../components/LayoutPage";
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
