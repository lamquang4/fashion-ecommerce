import LayoutPage from "@/components/layout/LayoutPage";
import OrderDetail from "@/components/order/OrderDetail";
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
