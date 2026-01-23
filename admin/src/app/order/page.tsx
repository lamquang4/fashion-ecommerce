import { Suspense } from "react";
import LayoutPage from "../../components/layout/LayoutPage";
import OrderList from "../../components/order/OrderList";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <OrderList />
      </Suspense>
    </LayoutPage>
  );
}
