import BlogDetailContainer from "@/components/blog/blogdetail/BlogDetailContainer";
import { generateBlogMetadata } from "@/lib/seo/blog.metadata";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return generateBlogMetadata(slug);
}

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
