import BlogSlug from "@/components/BlogSlug";
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
