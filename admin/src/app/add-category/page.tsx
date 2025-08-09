import LayoutPage from "../../components/LayoutPage";
import AddCategory from "../../components/AddCategory";
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
