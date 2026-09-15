import { Metadata } from "next";
import { getProductBySlug } from "@/lib/queries/product.queries";
import { stripHtml } from "@/utils/stripHtml";

export async function generateProductMetadata(slug: string): Promise<Metadata> {
  const product: any = await getProductBySlug(slug);

  if (!product) {
    return { title: "Sản phẩm không tồn tại" };
  }

  const firstImage = product.variants?.[0]?.images?.[0];
  const description = stripHtml(product.description || "").slice(0, 160);

  return {
    title: product.name,
    description: description,
    openGraph: {
      title: product.name,
      description: description,
      images: firstImage ? [{ url: firstImage }] : [],
    },
    alternates: {
      canonical: `/product/${product.slug}`,
    },
  };
}
