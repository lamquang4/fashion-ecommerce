import LayoutPage from "../../components/layout/LayoutPage";
import AddSize from "../../components/size/AddSize";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <AddSize />
      </Suspense>
    </LayoutPage>
  );
}
