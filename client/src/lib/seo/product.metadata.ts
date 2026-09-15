import { Metadata } from "next";
import { getProductBySlug } from "@/lib/queries/product.queries";

export async function generateProductMetadata(slug: string): Promise<Metadata> {
  const product: any = await getProductBySlug(slug);

  if (!product) {
    return { title: "Sản phẩm không tồn tại" };
  }

  return {
    title: product.name,
    description: product.description?.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160),
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
    alternates: {
      canonical: `/product/${product.slug}`,
    },
  };
}
