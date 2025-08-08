import LayoutPage from "../../components/LayoutPage";
import Color from "../../components/Color";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <Color />
      </Suspense>
    </LayoutPage>
  );
}
