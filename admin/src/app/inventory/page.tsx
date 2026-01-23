import InventoryList from "@/components/inventory/InventoryList";
import LayoutPage from "../../components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <InventoryList />
      </Suspense>
    </LayoutPage>
  );
}
