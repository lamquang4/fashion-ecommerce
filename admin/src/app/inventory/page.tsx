import LayoutPage from "../../components/layout/LayoutPage";
import { Suspense } from "react";
import InventoryList from "../../components/InventoryList";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <InventoryList />
      </Suspense>
    </LayoutPage>
  );
}
