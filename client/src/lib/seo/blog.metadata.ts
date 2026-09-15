import { Metadata } from "next";
import { getBlogBySlug } from "@/lib/queries/blog.queries";
import { stripHtml } from "@/utils/stripHtml";

export async function generateBlogMetadata(slug: string): Promise<Metadata> {
  const blog: any = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Bài viết không tồn tại" };
  }

  const summary = stripHtml(blog.summary || "").slice(0, 160);

  return {
    title: blog.title,
    description: summary,
    openGraph: {
      title: blog.title,
      description: summary,
      images: blog.image ? [{ url: blog.image }] : [],
    },
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
  };
}
