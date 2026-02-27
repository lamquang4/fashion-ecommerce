"use client";
import useGetProductsGender from "@/hooks/useGetProductsGender";
import useGetMainBanners from "@/hooks/useGetMainBanners";
import useGetLatestBlogs from "@/hooks/useGetLatestBlogs";
import BlogSlider from "../blog/BlogSlider";
import ProductSlider from "../product/ProductSlider";
import MainBanner from "./MainBanner";
import ServiceFeature from "./ServiceFeature";
import CategoryList from "./CategoryList";
import PromoteBanner from "./PromoteBanner";
import CollectionBanner from "./CollectionBanner";
import useGetPromoteBanners from "@/hooks/useGetPromoteBanners";
import useGetCollectionBanners from "@/hooks/useGetCollectionBanners";
import useGetCategories from "@/hooks/useGetCategories";

export default function Home() {
  const {
    banners1,
    banners2,
    isLoading: isLoadingBanners,
  } = useGetMainBanners();
  const { blogs, isLoading: isLoadingBlogs } = useGetLatestBlogs();
  const {
    productsMale,
    productsFemale,
    isLoading: isLoadingProducts,
  } = useGetProductsGender();

  const { promotions, isLoading: isLoadingPromotions } = useGetPromoteBanners();
  const { collections, isLoading: isLoadingCollections } =
    useGetCollectionBanners();
  const {
    categoriesMale,
    categoriesFemale,
    isLoading: isLoadingCategories,
  } = useGetCategories();
  return (
    <>
      <MainBanner
        banners1={banners1}
        banners2={banners2}
        isLoading={isLoadingBanners}
      />

      <ServiceFeature />
      <CategoryList
        categoriesFemale={categoriesFemale}
        categoriesMale={categoriesMale}
        isLoading={isLoadingCategories}
      />
      <PromoteBanner
        banners={promotions}
        gender={1}
        isLoading={isLoadingPromotions}
      />
      <ProductSlider
        title={"Nam"}
        products={productsMale}
        isLoading={isLoadingProducts}
      />
      <PromoteBanner
        banners={promotions}
        gender={0}
        isLoading={isLoadingPromotions}
      />
      <ProductSlider
        title={"Nữ"}
        products={productsFemale}
        isLoading={isLoadingProducts}
      />
      <CollectionBanner
        banners={collections}
        isLoading={isLoadingCollections}
      />
      <BlogSlider
        title="Tin tức thời trang"
        blogs={blogs}
        isLoading={isLoadingBlogs}
      />
    </>
  );
}
