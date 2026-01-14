import { Suspense } from "react";
import Order from "@/components/order/Order";

function page() {
  return (
    <Suspense>
      <Order />
    </Suspense>
  );
}

export default page;
