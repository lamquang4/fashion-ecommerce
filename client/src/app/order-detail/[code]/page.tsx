import { Suspense } from "react";
import OrderDetail from "../../../components/OrderDetail";

function page() {
  return (
    <Suspense>
      <OrderDetail />
    </Suspense>
  );
}

export default page;
