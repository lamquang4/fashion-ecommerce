import { Suspense } from "react";
import Order from "@/components/Order/Order";

function page() {
  return (
    <Suspense>
      <Order />
    </Suspense>
  );
}

export default page;
