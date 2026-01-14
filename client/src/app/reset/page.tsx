import ForgotPassword from "@/components/ResetPassword";
import { Suspense } from "react";

function page() {
  return (
    <>
      <Suspense>
        <ForgotPassword />
      </Suspense>
    </>
  );
}

export default page;
