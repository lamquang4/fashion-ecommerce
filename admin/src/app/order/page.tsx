import { Suspense } from "react";
import LayoutPage from "../../components/layout/LayoutPage";
import Order from "../../components/order/Order";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <Order />
      </Suspense>
    </LayoutPage>
  );
}
