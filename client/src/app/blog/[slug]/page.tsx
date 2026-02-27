import BlogDetailContainer from "@/components/blog/blogdetail/BlogDetailContainer";
import { Suspense } from "react";

function page() {
  return (
    <>
      <Suspense>
        <BlogDetailContainer />
      </Suspense>
    </>
  );
}

export default page;
