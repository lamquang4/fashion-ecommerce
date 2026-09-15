import Blog from "@/model/Blog";
import { connectMongoDB } from "../mongodb";

export async function getBlogBySlug(slug: string) {
  await connectMongoDB();
  return Blog.findOne({ slug }).lean();
}
