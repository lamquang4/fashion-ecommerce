import BlogSlug from "@/components/Blog/BlogDetail/BlogSlug";
import { Suspense } from "react";

function page() {
  return (
    <>
      <Suspense>
        <BlogSlug />
      </Suspense>
    </>
  );
}

export default page;
