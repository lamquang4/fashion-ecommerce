import LayoutPage from "../../components/LayoutPage";
import AddCustomer from "../../components/AddCustomer";
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
