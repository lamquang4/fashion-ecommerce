"use client";
import useGetProductsGender from "@/hooks/useGetProductsGender";
import BannerCarousel from "../components/BannerCarousel";
import CategoryList from "../components/CategoryList";
import Collection from "../components/Collection";
import ProductSlider from "../components/ProductSlider";
import PromoteBanner from "../components/PromoteBanner";
import ServiceFeature from "../components/ServiceFeature";
import useGetMainBanners from "@/hooks/useGetBanners";
import Loading from "@/components/Loading";

export default function Home() {
  const { productsMale, productsFemale } = useGetProductsGender();
  const { isLoading } = useGetMainBanners();
  return (
    <>
      <section>
        {isLoading ? (
          <Loading height={70} />
        ) : (
          <>
            <BannerCarousel />
            <ServiceFeature />
            <CategoryList />
            <PromoteBanner gender={1} />
            <ProductSlider title={"Nam"} products={productsMale} />
            <PromoteBanner gender={0} />
            <ProductSlider title={"Nữ"} products={productsFemale} />
            <Collection />
          </>
        )}
      </section>
    </>
  );
}
