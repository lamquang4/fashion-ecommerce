import OrderDetail from "@/components/Order/OrderDetail/OrderDetail";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <OrderDetail />
    </Suspense>
  );
}

export default page;
