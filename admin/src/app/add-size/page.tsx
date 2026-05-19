import LayoutPage from "../../components/layout/LayoutPage";
import AddSizeForm from "../../components/size/AddSizeForm";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <AddSizeForm />
      </Suspense>
    </LayoutPage>
  );
}
