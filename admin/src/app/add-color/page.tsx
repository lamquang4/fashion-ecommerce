import LayoutPage from "../../components/LayoutPage";
import AddColor from "../../components/AddColor";
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
