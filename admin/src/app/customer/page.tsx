import Customer from "@/components/customer/Customer";
import LayoutPage from "../../components/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <Customer />
      </Suspense>
    </LayoutPage>
  );
}
