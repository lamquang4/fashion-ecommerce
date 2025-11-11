"use client";
import Link from "next/link";
import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import { IoMdAddCircle } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";
import Image from "../Image";
import Pagination from "../Pagination";
import FilterDropDownMenu from "../FilterDropDownMenu";
import useGetProducts from "@/hooks/useGetProducts";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import useVisibleProduct from "@/hooks/useVisibleProduct";
import useDeleteProduct from "@/hooks/useDeleteProduct";
import Loading from "../Loading";
import InputSearch from "../InputSearch";
import toast from "react-hot-toast";
import { Variant } from "@/types/types";
import { useState } from "react";
function Product() {
  const [selectedVariant, setSelectedVariant] = useState<
    Record<string, Variant>
  >({});

  const {
    products,
    mutate,
    isLoading,
    totalPages,
    totalItems,
    currentPage,
    limit,
  } = useGetProducts();
  const { visibleProduct, isLoading: isLoadingVisibleProduct } =
    useVisibleProduct();
  const { deleteProduct, isLoading: isLoadingDeleteProduct } =
    useDeleteProduct();

  const array = [
    {
      name: "Tất cả",
      value: null,
    },
    {
      name: "Hiện",
      value: 1,
    },
    {
      name: "Ẩn",
      value: 0,
    },
  ];

  const handleSelectVariant = (productId: string, variant: Variant) => {
    setSelectedVariant((prev) => ({
      ...prev,
      [productId]: variant,
    }));
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }
    try {
      await deleteProduct(id);
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
      mutate();
    }
  };

  const handleVisible = async (id: string, status: number) => {
    if (!id && !status) {
      return;
    }
    try {
      await visibleProduct(id, status);
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
      mutate();
    }
  };

  return (
    <>
      <div className="py-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <h2 className="mb-[20px] text-[#74767d]">Quần áo ({totalItems})</h2>

        <Link
          href={"/add-product"}
          className="bg-[#daf4f0] border-0 cursor-pointer text-[0.9rem] font-medium w-[90px] !flex p-[10px_12px] items-center justify-center gap-[5px] text-[#0ab39c] hover:bg-[#0ab39c] hover:text-white"
        >
          <IoMdAddCircle size={22} /> Thêm
        </Link>
      </div>

      <div className=" bg-white w-full overflow-auto">
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full text-[0.9rem]">
          <thead>
            <tr className="bg-[#E9EDF2] text-left">
              <th className="p-[1rem]  ">Sản phẩm</th>

              <th className="p-[1rem]  ">Giá</th>

              <th className="p-[1rem]  ">Số lượng</th>

              <th className="p-[1rem]  ">Màu sắc</th>

              <th className="p-[1rem]  ">Ngày thêm</th>
              <th className="p-[1rem]  ">Danh mục</th>
              <th className="p-[1rem]   relative">
                <FilterDropDownMenu
                  title="Tình trạng"
                  array={array}
                  paramName="status"
                />
              </th>
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
            ) : products.length > 0 ? (
              products.map((product) => {
                const variant =
                  selectedVariant[product._id] ?? product.variants[0];

                return (
                  <tr key={product._id} className="hover:bg-[#f2f3f8]">
                    <td className="p-[1rem]">
                      <div className="flex gap-[10px] items-center">
                        <div className="relative group">
                          {variant.images[0] && (
                            <Image
                              Src={variant.images[0]}
                              Alt={product.name}
                              ClassName={"w-[80px] z-[1] relative"}
                              loadingType="lazy"
                            />
                          )}
                          {variant.images[1] && (
                            <Image
                              Src={variant.images[1]}
                              Alt={product.name}
                              ClassName={
                                "w-[80px] absolute top-0 left-0 opacity-0 z-[2] transition-opacity duration-300 group-hover:opacity-100"
                              }
                              loadingType="eager"
                            />
                          )}
                        </div>

                        <p className="text-[0.9rem] font-medium  text-[#444]">
                          {product.name}
                        </p>
                      </div>
                    </td>

                    <td className="p-[1rem]  ">
                      {product.discount > 0 ? (
                        <div className="flex gap-[12px]  ">
                          <del className="text-[#707072] text-[1rem]">
                            {product.price.toLocaleString("vi-VN")}₫
                          </del>

                          <p className="font-medium text-[#c00]">
                            {(product.price - product.discount).toLocaleString(
                              "vi-VN"
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
                        <p>Tồn kho: {product.totalQuantity}</p>
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
                      {new Date(product.createdAt).toLocaleDateString("vi-VN")}
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
                      {product.status === 1
                        ? "Hiện"
                        : product.status === 0
                        ? "Ẩn"
                        : ""}
                    </td>

                    <td className="p-[1rem]  ">
                      <div className="flex items-center gap-[15px]">
                        <button
                          disabled={isLoadingVisibleProduct}
                          onClick={() =>
                            handleVisible(
                              product._id,
                              product.status === 1 ? 0 : 1
                            )
                          }
                        >
                          {product.status === 1 ? (
                            <FaRegEyeSlash
                              size={22}
                              className="text-[#74767d]"
                            />
                          ) : (
                            <MdOutlineRemoveRedEye
                              size={22}
                              className="text-[#74767d]"
                            />
                          )}
                        </button>
                        <Link href={`/edit-product/${product._id}`}>
                          <LiaEdit size={22} className="text-[#076ffe]" />
                        </Link>
                        <button
                          disabled={isLoadingDeleteProduct}
                          onClick={() => handleDelete(product._id)}
                        >
                          <VscTrash size={22} className="text-[#d9534f]" />
                        </button>
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
                      Src={"/assets/other/notfound1.png"}
                      Alt={""}
                      ClassName={"w-[135px]"}
                      loadingType="lazy"
                    />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        limit={limit}
        totalItems={totalItems}
      />
    </>
  );
}

export default Product;
