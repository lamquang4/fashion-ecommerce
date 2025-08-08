import LayoutPage from "../../components/LayoutPage";
import Customer from "../../components/Customer";
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
