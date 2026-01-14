"use client";
import useGetProductsGender from "@/hooks/useGetProductsGender";
import Loading from "@/components/Loading";
import useGetMainBanners from "@/hooks/useGetMainBanners";
import useGetLatestBlogs from "@/hooks/useGetLatestBlogs";
import BlogSlider from "../blog/BlogSlider";
import ProductSlider from "../product/ProductSlider";
import MainBanner from "./MainBanner";
import ServiceFeature from "./ServiceFeature";
import CategoryList from "./CategoryList";
import PromoteBanner from "./PromoteBanner";
import CollectionBanner from "./CollectionBanner";

export default function Home() {
  const { isLoading } = useGetMainBanners();
  const { blogs } = useGetLatestBlogs();
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
          <BlogSlider title="Tin tức thời trang" blogs={blogs} />
        </>
      )}
    </>
  );
}
