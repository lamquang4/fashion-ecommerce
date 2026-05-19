import AddBlogForm from "@/components/blog/AddBlogForm";
import LayoutPage from "../../components/layout/LayoutPage";
import { Suspense } from "react";

export default async function page() {
  return (
    <LayoutPage>
      <Suspense>
        <AddBlogForm />
      </Suspense>
    </LayoutPage>
  );
}
