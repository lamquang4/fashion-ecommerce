import { Suspense } from "react";
import LayoutPage from "@/components/layout/LayoutPage";
import EditBlog from "@/components/blog/EditBlog";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <EditBlog />
      </Suspense>
    </LayoutPage>
  );
}
