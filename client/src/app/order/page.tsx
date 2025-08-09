import { Suspense } from "react";
import OrderHistory from "../../components/OrderHistory";

function page() {
  return (
    <Suspense>
      <OrderHistory />
    </Suspense>
  );
}

export default page;
