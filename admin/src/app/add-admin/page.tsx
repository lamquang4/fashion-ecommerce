import LayoutPage from "../../components/layout/LayoutPage";
import AddAdmin from "../../components/admin/AddAdmin";
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
