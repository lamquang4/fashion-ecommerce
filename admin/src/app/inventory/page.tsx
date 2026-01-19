import LayoutPage from "../../components/layout/LayoutPage";
import Inventory from "../../components/Inventory";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <Inventory />
      </Suspense>
    </LayoutPage>
  );
}
