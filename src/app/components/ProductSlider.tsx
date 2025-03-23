"use client";
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";

function ProductSlider({ title }: any) {
  const productLists = [
    {
      name: "Áo sơ mi Leweu Kio",
      price: "200,000₫",
      discount: "180,000₫",
      imgFront: "/assets/products/IMGSP3483.png",
      imgBack: "/assets/products/SECSP34831.png",
      type: "Áo sơ mi",
      gender: "Nam",
      discountPercent: "10%",
    },
    {
      name: "Áo Polo Cotton Basic",
      price: "250,000₫",
      discount: "225,000₫",
      imgFront: "/assets/products/IMGSP3483.png",
      imgBack: "/assets/products/SECSP34831.png",
      type: "Áo Polo",
      gender: "Nam",
      discountPercent: "10%",
    },
    {
      name: "Áo Hoodie Form Rộng",
      price: "320,000₫",
      discount: "290,000₫",
      imgFront: "/assets/products/IMGSP3483.png",
      imgBack: "/assets/products/SECSP34831.png",
      type: "Áo Hoodie",
      gender: "Nam",
      discountPercent: "10%",
    },
    {
      name: "Quần Jeans Slimfit",
      price: "400,000₫",
      discount: "360,000₫",
      imgFront: "/assets/products/IMGSP3483.png",
      imgBack: "/assets/products/SECSP34831.png",
      type: "Quần Jeans",
      gender: "Nam",
      discountPercent: "10%",
    },
  ];
  const [sliderRef] = useKeenSlider({
    loop: false,
    slides: { perView: 4, spacing: 12 },
    breakpoints: {
      "(max-width: 1640px)": {
        slides: { perView: 4, spacing: 12 },
      },
      "(max-width: 1024px)": {
        slides: { perView: 3, spacing: 12 },
      },
      "(max-width: 768px)": {
        slides: { perView: 2, spacing: 12 },
      },
      "(max-width: 480px)": {
        slides: { perView: 2, spacing: 12 },
      },
    },
  });

  return (
    <section className="px-[10px] mt-[30px] sm:mt-[45px] sm:px-[15px]">
      <div className="w-full mx-auto md:max-w-[980px] lg:max-w-[1200px]">
        <h2 className="text-[1.5rem] sm:text-[1.7rem] font-[550] mb-[15px]">
          {title}
        </h2>
        <div ref={sliderRef} className="keen-slider">
          {productLists.map((product, index) => (
            <div key={index} className="keen-slider__slide">
              <div className="relative group">
                <Link href={"/product"}>
                  <img
                    src={product.imgFront}
                    alt=""
                    className="block w-full h-auto object-cover z-[1] relative"
                    loading="lazy"
                  />
                  <img
                    src={product.imgBack}
                    alt=""
                    loading="lazy"
                    className="block w-full h-auto object-cover absolute top-0 left-0 opacity-0 z-[2] transition-opacity duration-300 group-hover:opacity-100"
                  />
                </Link>
                <div className="absolute bottom-[10px] md:top-[10px] left-[10px] z-[3] font-semibold text-center text-black">
                  <p className="uppercase text-[0.75rem] px-[5px] py-[5px] bg-white w-[90px]">
                    Giảm giá {product.discountPercent}
                  </p>
                </div>
              </div>
              <div className="p-[14px_2px]">
                <h2 className="text-[#969696] text-[0.85rem] sm:text-[0.95rem] font-medium uppercase mb-[8px]">
                  {product.type} / {product.gender}
                </h2>
                <h2 className="text-black text-[0.85rem] sm:text-[0.95rem] font-medium capitalize mb-[8px]">
                  {product.name}
                </h2>
                <div className="flex gap-[10px] text-[0.9rem] sm:text-[1rem] text-black">
                  <del className="text-[#707072]">{product.price}</del>
                  <p className="font-medium">{product.discount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductSlider;
