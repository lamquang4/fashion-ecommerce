import LayoutPage from "../../components/layout/LayoutPage";
import AddColorForm from "../../components/color/AddColorForm";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <AddColorForm />
      </Suspense>
    </LayoutPage>
  );
}
