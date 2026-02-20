"use client";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import Link from "next/link";
import Image from "../ui/Image";
import Loading from "../ui/Loading";
import useGetTop10Products from "@/hooks/useGetTop10Products";
import { Variant } from "@/types/types";
import { useState } from "react";
function TopProduct() {
  const [selectedVariant, setSelectedVariant] = useState<
    Record<string, Variant>
  >({});
  const { topProducts, isLoading } = useGetTop10Products();

  const handleSelectVariant = (productId: string, variant: Variant) => {
    setSelectedVariant((prev) => ({
      ...prev,
      [productId]: variant,
    }));
  };
  return (
    <div>
      <div className="py-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <h2 className="text-[#74767d]">Top 10 bán chạy nhất</h2>
      </div>

      <div className=" bg-white w-full overflow-auto">
        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full text-[0.9rem]">
          <thead>
            <tr className="bg-[#E9EDF2] text-left">
              <th className="p-[1rem]  ">Sản phẩm</th>

              <th className="p-[1rem]  ">Giá</th>

              <th className="p-[1rem]  ">Số lượng</th>

              <th className="p-[1rem]  ">Màu sắc</th>

              <th className="p-[1rem]  ">Danh mục</th>

              <th className="p-[1rem]  ">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="w-full">
                  <Loading height={60} size={50} color="black" thickness={2} />
                </td>
              </tr>
            ) : topProducts.length > 0 ? (
              topProducts.map((product) => {
                const variant =
                  selectedVariant[product._id] ?? product.variants[0];
                return (
                  <tr key={product._id} className="hover:bg-[#f2f3f8]">
                    <td className="p-[1rem]">
                      <div className="flex gap-[10px] items-center">
                        <div className="relative group">
                          {variant.images[0] && (
                            <Image
                              src={variant.images[0]}
                              alt={product.name}
                              className={"w-[80px] z-[1] relative"}
                              loading="lazy"
                            />
                          )}
                          {variant.images[1] && (
                            <Image
                              src={variant.images[1]}
                              alt={product.name}
                              className={
                                "w-[80px] absolute top-0 left-0 opacity-0 z-[2] transition-opacity duration-300 group-hover:opacity-100"
                              }
                              loading="eager"
                            />
                          )}
                        </div>

                        <p className="text-[0.9rem] font-medium  text-[#444]">
                          {product.name}
                        </p>
                      </div>
                    </td>

                    <td className="p-[1rem]">
                      {product.discount > 0 ? (
                        <div className="flex gap-[12px] text-black">
                          <del className="text-[#707072] text-[1rem]">
                            {product.price.toLocaleString("vi-VN")}₫
                          </del>

                          <p className="font-medium text-[#c00]">
                            {(product.price - product.discount).toLocaleString(
                              "vi-VN",
                            )}
                            ₫
                          </p>
                        </div>
                      ) : (
                        <p className="font-medium">
                          {product.price.toLocaleString("vi-VN")}₫
                        </p>
                      )}
                    </td>
                    <td className="p-[1rem]  ">
                      <div className="flex flex-col gap-1.5">
                        <p>Còn lại: {product.totalQuantity}</p>
                        <p>Đã bán: {product.totalSold}</p>
                      </div>
                    </td>

                    <td className="p-[1rem]  ">
                      <div className="flex gap-1.5">
                        {product.variants.map((variant1, index) => (
                          <button
                            className={`w-5.5 h-5.5 border-gray-400 border rounded-full focus:ring-1 focus:ring-offset-2 ring-red-800 ${
                              variant._id === variant1._id
                                ? "ring-1 ring-offset-2"
                                : ""
                            }`}
                            style={{
                              backgroundColor: variant1.color?.codecolor,
                            }}
                            onClick={() =>
                              handleSelectVariant(product._id, variant1)
                            }
                            key={index}
                            title={variant1.color?.namecolor}
                          ></button>
                        ))}
                      </div>
                    </td>

                    <td className="p-[1rem]  ">
                      {product.category.namecategory}/
                      {product.category.gender === 1
                        ? "Nam"
                        : product.category.gender === 0
                          ? "Nữ"
                          : ""}
                    </td>

                    <td className="p-[1rem]  ">
                      <div className="flex items-center gap-[15px]">
                        <Link href={`/edit-product/${product._id}`}>
                          <LiaExternalLinkAltSolid
                            size={23}
                            className="text-[#076ffe]"
                          />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="w-full h-[70vh]">
                  <div className="flex justify-center items-center">
                    <Image
                      src={"/assets/other/notfound1.png"}
                      alt={""}
                      className={"w-[135px]"}
                      loading="lazy"
                    />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopProduct;
