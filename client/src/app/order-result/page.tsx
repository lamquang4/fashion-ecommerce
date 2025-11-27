import OrderResult from "@/components/OrderResult";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <OrderResult />
    </Suspense>
  );
}

export default page;
