import Product from "@/model/Product";
import { connectMongoDB } from "../mongodb";

export async function getProductBySlug(slug: string) {
  await connectMongoDB();
  return Product.findOne({ slug }).lean();
}
