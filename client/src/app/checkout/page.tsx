import CheckoutForm from "@/components/CheckoutForm";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <CheckoutForm />
    </Suspense>
  );
}

export default page;
