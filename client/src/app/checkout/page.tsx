import { Suspense } from "react";
import CheckoutForm from "../../components/CheckoutForm";

function Checkout() {
  return (
    <Suspense>
      <CheckoutForm />
    </Suspense>
  );
}

export default Checkout;
