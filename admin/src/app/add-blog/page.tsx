import LayoutPage from "../../components/LayoutPage";
import { Suspense } from "react";
import AddBlog from "@/components/AddBlog";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <AddBlog />
      </Suspense>
    </LayoutPage>
  );
}
