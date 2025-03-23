"use client";
import Link from "next/link";
import React, { useState } from "react";
import Pagination from "./Pagination";
import AdvancedSearch from "./AdvancedSearch";
import Image from "./Image";
function ProductList() {
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const toggleAdvancedSearch = () => {
    setAdvancedSearchOpen(!advancedSearchOpen);
  };
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
  return (
    <section className="px-[10px] mt-[30px] sm:mt-[45px] sm:px-[15px]">
      <div className="w-full m-[0_auto] md:max-w-[1000px] lg:max-w-[1240px]">
        <div className="flex justify-between items-center flex-wrap my-[10px] mb-[35px]">
          <h2 className="text-[1.5rem] sm:text-[1.7rem] font-[550]">
            Tất cả (15)
          </h2>
          <button
            className="px-2 py-2 border border-black text-[0.85rem] text-black"
            onClick={toggleAdvancedSearch}
          >
            Bộ lọc & Sắp xếp
          </button>
        </div>

        <AdvancedSearch
          isOpen={advancedSearchOpen}
          toggleMenu={toggleAdvancedSearch}
        />

        <div className="grid grid-cols-2 gap-x-[12px] gap-y-[35px] lg:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2">
          {productLists.map((product, index) => (
            <div key={index}>
              <div className="relative group">
                <Link href={"/product"}>
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

        <Pagination />
      </div>
    </section>
  );
}

export default ProductList;
