import LayoutPage from "../../components/layout/LayoutPage";
import AddCustomer from "../../components/customer/AddCustomer";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <AddCustomer />
      </Suspense>
    </LayoutPage>
  );
}
