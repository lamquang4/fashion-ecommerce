"use client";
import useGetProductsGender from "@/hooks/useGetProductsGender";
import BannerCarousel from "../components/BannerCarousel";
import BlogList from "../components/BlogList";
import CategoryList from "../components/CategoryList";
import Collection from "../components/Collection";
import ProductSlider from "../components/ProductSlider";
import PromoteBanner from "../components/PromoteBanner";
import ServiceFeature from "../components/ServiceFeature";

export default function Home() {
  const { productsMale, productsFemale } = useGetProductsGender();
  console.log(productsMale);

  return (
    <>
      <section>
        <BannerCarousel />
        <ServiceFeature />
        <CategoryList />
        <PromoteBanner gender={1} />
        <ProductSlider title={"Nam"} products={productsMale} />
        <PromoteBanner gender={0} />
        <ProductSlider title={"Nữ"} products={productsFemale} />
        <Collection />

        <BlogList />
      </section>
    </>
  );
}
