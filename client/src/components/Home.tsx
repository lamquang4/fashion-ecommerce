"use client";
import useGetProductsGender from "@/hooks/useGetProductsGender";
import CategoryList from "../components/CategoryList";
import ProductSlider from "../components/ProductSlider";
import PromoteBanner from "../components/PromoteBanner";
import ServiceFeature from "../components/ServiceFeature";
import useGetMainBanners from "@/hooks/useGetBanners";
import Loading from "@/components/Loading";
import MainBanner from "../components/MainBanner";
import CollectionBanner from "../components/CollectionBanner";

export default function Home() {
  const { productsMale, productsFemale } = useGetProductsGender();
  const { isLoading } = useGetMainBanners();
  return (
    <>
      {isLoading ? (
        <Loading height={70} size={50} color="black" thickness={3} />
      ) : (
        <>
          <MainBanner />
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
