import LayoutPage from "../../components/LayoutPage";
import Category from "../../components/Category";
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
