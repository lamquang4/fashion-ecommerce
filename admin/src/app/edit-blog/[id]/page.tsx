import { Suspense } from "react";
import LayoutPage from "@/components/layout/LayoutPage";
import EditBlogForm from "@/components/blog/EditBlogForm";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <EditBlogForm />
      </Suspense>
    </LayoutPage>
  );
}
