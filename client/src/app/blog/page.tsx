import BlogAll from "@/components/BlogAll";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <BlogAll />
    </Suspense>
  );
}

export default page;
