import LayoutPage from "@/components/LayoutPage";
import OrderDetail from "@/components/OrderDetail";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <OrderDetail />
      </Suspense>
    </LayoutPage>
  );
}
