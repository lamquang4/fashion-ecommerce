import LayoutPage from "../../components/LayoutPage";
import AddAdmin from "../../components/AddAdmin";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <AddAdmin />
      </Suspense>
    </LayoutPage>
  );
}
