import LayoutPage from "../../components/LayoutPage";
import Collection from "../../components/Collection";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <Collection />
      </Suspense>
    </LayoutPage>
  );
}
