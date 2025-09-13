"use client";
import useGetProductsGender from "@/hooks/useGetProductsGender";
import ProductSlider from "../components/ProductSlider";
import PromoteBanner from "../components/PromoteBanner";
import ServiceFeature from "../components/ServiceFeature";
import Loading from "@/components/Loading";
import MainBanner from "../components/MainBanner";
import CollectionBanner from "../components/CollectionBanner";
import useGetMainBanners from "@/hooks/useGetMainBanners";
import BlogSlider from "./BlogSlider";
import useGetLatestBlogs from "@/hooks/useGetLatestBlogs";
import CategoryList from "./CategoryList";

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
          <BlogSlider title="Bài viết mới nhất" blogs={blogs} />
        </>
      )}
    </>
  );
}
