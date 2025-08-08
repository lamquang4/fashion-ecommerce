import LayoutPage from "../../components/LayoutPage";
import Account from "../../components/Account";
import { Suspense } from "react";
export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <Account />
      </Suspense>
    </LayoutPage>
  );
}
