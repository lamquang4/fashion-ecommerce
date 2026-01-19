import LayoutPage from "../../components/layout/LayoutPage";
import AddColor from "../../components/color/AddColor";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <AddColor />
      </Suspense>
    </LayoutPage>
  );
}
