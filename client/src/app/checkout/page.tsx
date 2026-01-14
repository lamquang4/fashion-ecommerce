import CheckoutForm from "@/components/checkout/CheckoutForm";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <CheckoutForm />
    </Suspense>
  );
}

export default page;
