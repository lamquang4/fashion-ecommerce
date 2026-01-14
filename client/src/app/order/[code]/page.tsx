import OrderDetail from "@/components/order/orderdetail/OrderDetail";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <OrderDetail />
    </Suspense>
  );
}

export default page;
