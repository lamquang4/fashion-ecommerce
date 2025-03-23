"use client";
import BannerCarousel from "./components/BannerCarousel";
import Blog from "./components/Blog";
import CategoryList from "./components/CategoryList";
import Gallery from "./components/Gallery";
import ProductSlider from "./components/ProductSlider";
import ServiceFeature from "./components/ServiceFeature";

export default function Home() {
  return (
    <>
      <section>
        <BannerCarousel />
        <ServiceFeature />
        <CategoryList />
        <ProductSlider title={"Nam"} />
        <ProductSlider title={"Nữ"} />
        <Gallery />
        <Blog />
      </section>
    </>
  );
}
