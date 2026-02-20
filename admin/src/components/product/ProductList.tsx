"use client";
import Link from "next/link";
import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import { FaRegEyeSlash } from "react-icons/fa";
import Image from "../ui/Image";
import Pagination from "../ui/Pagination";
import FilterDropDownMenu from "../ui/FilterDropDownMenu";
import useGetProducts from "@/hooks/useGetProducts";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import useVisibleProduct from "@/hooks/useVisibleProduct";
import useDeleteProduct from "@/hooks/useDeleteProduct";
import Loading from "../ui/Loading";
import InputSearch from "../ui/InputSearch";
import toast from "react-hot-toast";
import { Variant } from "@/types/types";
import { useState } from "react";
import ListHeader from "../list/ListHeader";
import ListBody from "../list/ListBody";
function ProductList() {
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
      <ListHeader
        title="Sản phẩm"
        totalItems={totalItems}
        addLink="/add-product"
      />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full text-[0.9rem]">
          <thead>
            <tr className="bg-[#E9EDF2] text-left">
              <th className="p-[1rem]  ">Sản phẩm</th>

              <th className="p-[1rem]  ">Giá bán</th>

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
                        <div className="relative w-[100px] h-[100px] overflow-hidden group">
                          {variant.images[0] && (
                            <Image
                              src={variant.images[0]}
                              alt={product.name}
                              className="absolute inset-0 w-full h-full object-contain opacity-100 group-hover:opacity-0"
                              loading="lazy"
                            />
                          )}

                          {variant.images[1] && (
                            <Image
                              src={variant.images[1]}
                              alt={product.name}
                              className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100"
                              loading="lazy"
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
                              product.status === 1 ? 0 : 1,
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
      </ListBody>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        limit={limit}
        totalItems={totalItems}
      />
    </>
  );
}

export default ProductList;
