"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";
import Image from "./Image";
import { Product } from "@/hooks/useGetProductsGender";
interface Props {
  title: string;
  products: Product[];
}
function ProductSlider({ title, products }: Props) {
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
    <>
      {products.length > 0 && (
        <section className="px-[10px] mt-[40px] sm:mt-[45px] sm:px-[15px]">
          <div className="w-full mx-auto md:max-w-[1000px] lg:max-w-[1240px]">
            <h2 className="text-[1.5rem] sm:text-[1.7rem] font-[550] mb-[15px]">
              {title}
            </h2>
            <div ref={sliderRef} className="keen-slider">
              {products.map((product, index) => (
                <div key={index} className="keen-slider__slide">
                  <div className="relative group">
                    <Link href={`/product/${product.slug}`}>
                      <picture>
                        <Image
                          Src={product.image[0]}
                          Alt={""}
                          ClassName={
                            "block w-full h-auto object-cover z-[1] relative"
                          }
                          loadingType="lazy"
                        />
                        <Image
                          Src={product.image[1]}
                          Alt={""}
                          ClassName={
                            "block w-full h-auto object-cover absolute top-0 left-0 opacity-0 z-[2] transition-opacity duration-300 group-hover:opacity-100"
                          }
                          loadingType="lazy"
                        />
                      </picture>
                    </Link>
                    {product.discount > 0 && (
                      <div className="absolute bottom-[10px] md:top-[10px] left-[10px] z-[3] font-semibold text-center text-black">
                        <p className="uppercase text-[0.75rem] px-[5px] py-[5px] bg-white w-[90px]">
                          Giảm giá{" "}
                          {Math.floor((product.discount / product.price) * 100)}
                          %
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="p-[14px_2px]">
                    <h2 className="text-[#969696] text-[0.9rem] sm:text-[0.95rem] font-medium uppercase mb-[6px]">
                      {product.category.namecategory} /{" "}
                      {product.category.gender === 1 ? "Nam" : "Nữ"}
                    </h2>
                    <h2 className="text-black text-[0.9rem] sm:text-[0.95rem] font-medium capitalize mb-[6px]">
                      {product.name}
                    </h2>
                    <div className="flex gap-[10px] text-[0.95rem] sm:text-[1rem] text-black mb-[8px]">
                      {product.discount > 0 && (
                        <del className="text-[#707072]">
                          {product.price.toLocaleString("vi-VN")}₫
                        </del>
                      )}
                      {product.discount > 0 ? (
                        <p className="font-medium">
                          {(product.price - product.discount).toLocaleString(
                            "vi-VN"
                          )}
                          ₫
                        </p>
                      ) : (
                        <p className="font-medium">
                          {product.price.toLocaleString("vi-VN")}₫
                        </p>
                      )}
                    </div>

                    {product.colors?.length > 0 && (
                      <div className="flex space-x-2">
                        {product.colors.map((color, index) => (
                          <button
                            key={index}
                            type="button"
                            title={color?.namecolor}
                            className="w-6 h-6 border-gray-500 border"
                            style={{ backgroundColor: color?.codecolor }}
                          ></button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ProductSlider;
