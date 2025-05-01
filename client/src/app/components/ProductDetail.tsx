"use client";
import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import Image from "./Image";
import { LiaRulerHorizontalSolid } from "react-icons/lia";
import { HiOutlineMinusSmall } from "react-icons/hi2";
import { HiOutlinePlusSmall } from "react-icons/hi2";
{
  /*
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
  */
}

function ProductDetail() {
  const [selectedSize, setSelectedSize] = useState<string>("S");
  const [mainImage, setMainImage] = useState<string>(
    "/assets/products/IMGSP1360.png"
  );
  const [quantity, setQuantity] = useState(1);
  const HandleIncrement = () => {
    setQuantity((prev) => (prev < 10 ? prev + 1 : prev));
  };

  const HandleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <section className="w-full mx-auto mt-0 lg:mt-[20px] mb-[40px]">
      <div className="flex justify-center flex-wrap gap-[40px] w-full">
        <div>
          <div className="flex flex-col md:flex-row gap-[20px] lg:sticky lg:top-[140px]">
            <div className=" md:order-2 relative grow overflow-hidden bg-white">
              <div className="max-w-full lg:max-w-[450px] flex flex-col gap-[20px]">
                <Image
                  Src={mainImage}
                  Alt={""}
                  ClassName={"w-full h-full object-cover"}
                />
              </div>
            </div>

            <div className="md:order-1 flex justify-center">
              <div className=" max-h-fit flex flex-row md:flex-col gap-[15px] overflow-x-auto md:overflow-x-hidden md:overflow-y-auto">
                <div
                  className="shrink-0 border border-gray-200 overflow-hidden cursor-pointer w-[70px]"
                  onMouseEnter={() =>
                    setMainImage("/assets/products/IMGSP1360.png")
                  }
                >
                  <Image
                    Src={"/assets/products/IMGSP1360.png"}
                    Alt={""}
                    ClassName={"w-full h-full object-cover"}
                  />
                </div>

                <div
                  className="shrink-0 border border-gray-200 overflow-hidden cursor-pointer w-[70px]"
                  onMouseEnter={() =>
                    setMainImage("/assets/products/SECSP13601.png")
                  }
                >
                  <Image
                    Src={"/assets/products/SECSP13601.png"}
                    Alt={""}
                    ClassName={"w-full h-full object-cover"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative lg:max-w-[500px] max-w-full px-[15px] sm:px-[20px]">
          <div className="py-[10px]">
            <p className="text-[1rem] mb-[5px]">Áo sơ mi / Nam</p>
            <h2 className="text-[1.3rem] mb-[5px] font-medium">
              Áo sơ mi gạch đỏ
            </h2>
            <div className="text-[1.5rem] flex gap-[15px] mb-[15px] font-medium">
              <del className="text-[#707072] font-light">180,000₫</del>
              <span>200,000₫</span>
            </div>

            <form action="">
              <div className="mb-[15px]">
                <p className="text-gray-700 font-medium mb-[5px]">
                  Màu sắc: Đen
                </p>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="w-8 h-8 bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  ></button>
                  <button
                    type="button"
                    className="w-8 h-8 bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                  ></button>
                  <button
                    type="button"
                    className="w-8 h-8 bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  ></button>
                </div>
              </div>

              <div className="flex flex-col space-y-2 mb-[30px]">
                <div className="flex justify-between">
                  <p className="text-gray-700 font-medium mb-[5px]">
                    Kích thước: M
                  </p>

                  <button type="button" className="flex gap-[6px] items-center">
                    <LiaRulerHorizontalSolid size={20} />

                    <span className="uppercase text-[0.9rem] underline">
                      Hướng dẫn chọn size
                    </span>
                  </button>
                </div>

                <div className="flex space-x-2">
                  <button
                    type="button"
                    className={`w-[80px] h-[36px] border text-gray-700 font-medium ${
                      selectedSize === "S"
                        ? "bg-transparent text-black border-black"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => setSelectedSize("S")}
                  >
                    S
                  </button>

                  <button
                    type="button"
                    className={`w-[80px] h-[36px] border text-gray-700 font-medium ${
                      selectedSize === "M"
                        ? "bg-transparent text-black border-black"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => setSelectedSize("M")}
                  >
                    M
                  </button>

                  <button
                    type="button"
                    className={`w-[80px] h-[36px] border  text-gray-700 font-medium ${
                      selectedSize === "L"
                        ? "bg-transparent text-black border-black"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => setSelectedSize("L")}
                  >
                    L
                  </button>

                  <button
                    type="button"
                    className="w-[80px] h-[36px] border text-gray-400 border-gray-300 cursor-not-allowed"
                    disabled
                  >
                    XL
                  </button>
                </div>
              </div>

              <div className="mb-[20px] relative flex justify-between items-center max-w-[8rem] border border-gray-300 rounded-sm">
                <button
                  type="button"
                  onClick={HandleDecrement}
                  disabled={quantity <= 1}
                  className=" p-3 h-11 outline-none"
                >
                  <HiOutlineMinusSmall size={22} />
                </button>
                <input
                  type="number"
                  name="quantity"
                  readOnly
                  className="h-11 text-center text-black w-11 outline-none placeholder:text-black text-[1rem] font-normal"
                  placeholder="1"
                  min={1}
                  max={10}
                  value={quantity}
                />
                <button
                  type="button"
                  onClick={HandleIncrement}
                  disabled={quantity >= 10}
                  className=" p-3 h-11 outline-none"
                >
                  <HiOutlinePlusSmall size={22} />
                </button>
              </div>

              <div className="w-full flex gap-[25px] flex-wrap mb-[30px] items-center">
                <button
                  type="submit"
                  className="px-[20px] py-[5px] w-[180px] uppercase text-[0.9rem] bg-black text-white max-w-[240px] min-h-[45px] font-medium hover:bg-[#050708]/80"
                >
                  Thêm vào giỏ
                </button>

                <button
                  type="button"
                  className="px-[20px] py-[5px] w-[180px] uppercase flex hover:border-black hover:bg-[#F7F7F7] gap-[5px] justify-center items-center text-[0.9rem] bg-transparent border border-[#CACACB] max-w-[240px] min-h-[45px]  font-medium"
                >
                  Yêu thích <CiHeart size={18} />
                </button>
              </div>
            </form>

            <div className="flex flex-col gap-y-[30px]">
              <div>
                <h2 className="text-[1.2rem] font-medium">Mô tả sản phẩm</h2>

                <hr className="border-1 my-[15px]" />

                <p className="text-[#6c757d] text-[0.95rem]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                  veniam est velit nemo vitae deserunt nobis neque, natus
                  consequuntur voluptatibus temporibus recusandae porro ab eum
                  tempore aperiam voluptatum rerum? Nesciunt.
                </p>
              </div>

              <div>
                <h2 className="text-[1.2rem] font-medium">
                  Hướng dẫn bảo quản
                </h2>

                <hr className="border-1 my-[15px]" />

                <p className="text-[#6c757d] text-[0.95rem]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                  veniam est velit nemo vitae deserunt nobis neque, natus
                  consequuntur voluptatibus temporibus recusandae porro ab eum
                  tempore aperiam voluptatum rerum? Nesciunt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
