"use client";
import BannerCarousel from "../components/BannerCarousel";
import BlogList from "../components/BlogList";
import CategoryList from "../components/CategoryList";
import Gallery from "../components/Gallery";
import ProductSlider from "../components/ProductSlider";
import PromoteBanner from "../components/PromoteBanner";
import ServiceFeature from "../components/ServiceFeature";

export default function Home() {
  return (
    <>
      <section>
        <BannerCarousel />
        <ServiceFeature />
        <CategoryList />
        <PromoteBanner gender="nam" />
        <ProductSlider title={"Nam"} />
        <PromoteBanner gender="nữ" />
        <ProductSlider title={"Nữ"} />
        <Gallery />

        <BlogList />
      </section>
    </>
  );
}
