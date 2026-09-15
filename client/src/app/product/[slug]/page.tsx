import ProductDetailContainer from "@/components/product/productdetail/ProductDetailContainer";
import { generateProductMetadata } from "@/lib/seo/product.metadata";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return generateProductMetadata(slug);
}

function page() {
  return (
    <Suspense>
      <ProductDetailContainer />
    </Suspense>
  );
}

export default page;
