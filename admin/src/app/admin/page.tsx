import LayoutPage from "../../components/LayoutPage";
import Admin from "../../components/Admin/Admin";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <Admin />
      </Suspense>
    </LayoutPage>
  );
}
