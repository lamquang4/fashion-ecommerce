"use client";
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";
import Image from "./Image";
interface TitleProp {
  title: string;
}
function ProductSlider({ title }: TitleProp) {
  const productLists = [
    {
      name: "Áo sơ mi Leweu Kio",
      price: "200,000₫",
      discount: "180,000₫",
      imgFront: "/assets/products/IMGSP3483.png",
      imgBack: "/assets/products/SECSP34831.png",
      type: "Áo sơ mi",
      gender: "Nam",
      discountPercent: "15%",
      color: "yes",
    },
    {
      name: "Áo sơ mi gạch đỏ",
      price: "250,000₫",
      discount: "",
      imgFront: "/assets/products/IMGSP1360.png",
      imgBack: "/assets/products/SECSP13601.png",
      type: "Áo sơ mi",
      gender: "Nam",
      discountPercent: "",
      color: "",
    },
    {
      name: "Áo thun cơ bản",
      price: "150,000₫",
      discount: "",
      imgFront: "/assets/products/IMGSP2914.png",
      imgBack: "/assets/products/SECSP29141.png",
      type: "Áo thun",
      gender: "Nam",
      discountPercent: "",
      color: "",
    },
    {
      name: "Áo sơ mi tay dài",
      price: "150,000₫",
      discount: "",
      imgFront: "/assets/products/IMGSP0841.png",
      imgBack: "/assets/products/SECSP08411.png",
      type: "Áo sơ mi",
      gender: "Nam",
      discountPercent: "",
      color: "yes",
    },
    {
      name: "Váy xanh đậm",
      price: "220,000₫",
      discount: "",
      imgFront: "/assets/products/IMGSP2013.png",
      imgBack: "/assets/products/SECSP20131.png",
      type: "Váy",
      gender: "Nữ",
      discountPercent: "",
      color: "",
    },
    {
      name: "Đầm trắng",
      price: "400,000₫",
      discount: "360,000₫",
      imgFront: "/assets/products/IMGSP4163.png",
      imgBack: "/assets/products/SECSP41631.png",
      type: "Đầm",
      gender: "Nữ",
      discountPercent: "10%",
      color: "",
    },
    {
      name: "Đầm hồng",
      price: "420,000₫",
      discount: "",
      imgFront: "/assets/products/IMGSP2067.png",
      imgBack: "/assets/products/SECSP20671.png",
      type: "Đầm",
      gender: "Nữ",
      discountPercent: "",
      color: "",
    },
    {
      name: "Đầm xanh đậm không tay",
      price: "380,000₫",
      discount: "",
      imgFront: "/assets/products/IMGSP4875.png",
      imgBack: "/assets/products/SECSP48751.png",
      type: "Đầm",
      gender: "Nữ",
      discountPercent: "",
      color: "yes",
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
    <section className="px-[10px] mt-[40px] sm:mt-[45px] sm:px-[15px]">
      <div className="w-full mx-auto md:max-w-[980px] lg:max-w-[1200px]">
        <h2 className="text-[1.5rem] sm:text-[1.7rem] font-[550] mb-[15px]">
          {title}
        </h2>
        <div ref={sliderRef} className="keen-slider">
          {productLists.map((product, index) => (
            <div key={index} className="keen-slider__slide">
              <div className="relative group">
                <Link href={"/product"}>
                <picture>
                    <Image
                    Src={product.imgFront}
                    Alt={""}
                    ClassName={
                      "block w-full h-auto object-cover z-[1] relative"
                    }
                  />
                  <Image
                    Src={product.imgBack}
                    Alt={""}
                    ClassName={
                      "block w-full h-auto object-cover absolute top-0 left-0 opacity-0 z-[2] transition-opacity duration-300 group-hover:opacity-100"
                    }
                  />
                </picture>
                
                </Link>
                {product.discountPercent && (
                  <div className="absolute bottom-[10px] md:top-[10px] left-[10px] z-[3] font-semibold text-center text-black">
                    <p className="uppercase text-[0.75rem] px-[5px] py-[5px] bg-white w-[90px]">
                      Giảm giá {product.discountPercent}
                    </p>
                  </div>
                )}
              </div>
              <div className="p-[14px_2px]">
                <h2 className="text-[#969696] text-[0.9rem] sm:text-[0.95rem] font-medium uppercase mb-[6px]">
                  {product.type} / {product.gender}
                </h2>
                <h2 className="text-black text-[0.9rem] sm:text-[0.95rem] font-medium capitalize mb-[6px]">
                  {product.name}
                </h2>
                <div className="flex gap-[10px] text-[0.95rem] sm:text-[1rem] text-black mb-[8px]">
                  {product.discountPercent && (
                    <del className="text-[#707072]">{product.price}</del>
                  )}
                  {product.discountPercent ? (
                    <p className="font-medium">{product.discount}</p>
                  ) : (
                    <p className="font-medium">{product.price}</p>
                  )}
                </div>

                {product.color && (
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="w-6 h-6 bg-black focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-black"
                    ></button>
                    <button
                      type="button"
                      className="w-6 h-6 bg-gray-300 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-300"
                    ></button>
                    <button
                      type="button"
                      className="w-6 h-6 bg-blue-500 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500"
                    ></button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductSlider;
