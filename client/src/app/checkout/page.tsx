import { Suspense } from "react";
import CheckoutForm from "../../components/CheckoutForm";

function page() {
  return (
    <Suspense>
      <CheckoutForm />
    </Suspense>
  );
}

export default page;
