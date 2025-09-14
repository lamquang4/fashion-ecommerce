
import CheckoutForm from "@/components/Checkout/CheckoutForm";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <CheckoutForm />
    </Suspense>
  );
}

export default page;
