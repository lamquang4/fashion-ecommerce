import { connectMongoDB } from "@/lib/mongodb";
import Blog from "@/model/Blog";
import Product from "@/model/Product";
import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectMongoDB();

  const products = await Product.find({}, "slug updatedAt").lean();
  const blogs = await Blog.find({}, "slug updatedAt").lean();

  const productUrls = products.map((p: any) => ({
    url: `${process.env.NEXTAUTH_URL}/product/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogUrls = blogs.map((b: any) => ({
    url: `${process.env.NEXTAUTH_URL}/blog/${b.slug}`,
    lastModified: b.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: process.env.NEXTAUTH_URL!,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...productUrls,
    ...blogUrls,
  ];
}
