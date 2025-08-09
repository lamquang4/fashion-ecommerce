import LayoutPage from "../../components/LayoutPage";
import Dashboard from "../../components/Dashboard";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <Dashboard />
      </Suspense>
    </LayoutPage>
  );
}
