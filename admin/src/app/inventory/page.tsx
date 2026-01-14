import LayoutPage from "../../components/LayoutPage";
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
