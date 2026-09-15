import { Metadata } from "next";
import { getBlogBySlug } from "@/lib/queries/blog.queries";

export async function generateBlogMetadata(slug: string): Promise<Metadata> {
  const blog: any = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Bài viết không tồn tại" };
  }

  return {
    title: blog.title,
    description: blog.excerpt?.slice(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.excerpt?.slice(0, 160),
      images: blog.thumbnail ? [{ url: blog.thumbnail }] : [],
    },
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
  };
}
