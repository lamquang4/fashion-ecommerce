import { Suspense } from "react";
import OrderContainer from "@/components/order/OrderContainer";

function page() {
  return (
    <Suspense>
      <OrderContainer />
    </Suspense>
  );
}

export default page;
