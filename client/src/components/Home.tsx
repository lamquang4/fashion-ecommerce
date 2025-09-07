"use client";
import useGetProductsGender from "@/hooks/useGetProductsGender";
import CategoryList from "../components/CategoryList";
import ProductSlider from "../components/ProductSlider";
import PromoteBanner from "../components/PromoteBanner";
import ServiceFeature from "../components/ServiceFeature";
import Loading from "@/components/Loading";
import MainBanner from "../components/MainBanner";
import CollectionBanner from "../components/CollectionBanner";
import useGetMainBanners from "@/hooks/useGetMainBanners";

export default function Home() {
  const { isLoading } = useGetMainBanners();
  const { productsMale, productsFemale } = useGetProductsGender();
  return (
    <>
      {isLoading ? (
        <Loading height={70} size={50} color="black" thickness={3} />
      ) : (
        <MainBanner />
      )}

      {!isLoading && (
        <>
          <ServiceFeature />
          <CategoryList />
          <PromoteBanner gender={1} />
          <ProductSlider title={"Nam"} products={productsMale} />
          <PromoteBanner gender={0} />
          <ProductSlider title={"Nữ"} products={productsFemale} />
          <CollectionBanner />
        </>
      )}
    </>
  );
}
