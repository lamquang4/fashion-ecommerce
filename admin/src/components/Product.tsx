"use client";
import Link from "next/link";
import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import { IoMdAddCircle } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";
import Image from "./Image";
import Pagination from "./Pagination";
import FilterDropDownMenu from "./FilterDropDownMenu";
import useGetProducts from "@/hooks/useGetProducts";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import useVisibleProduct from "@/hooks/useVisibleProduct";
import useDeleteProduct from "@/hooks/useDeleteProduct";
import Loading from "./Loading";
import InputSearch from "./InputSearch";
import toast from "react-hot-toast";
function Product() {
  const {
    products,
    mutate,
    isLoading,
    totalPages,
    totalItems,
    currentPage,
    limit,
    setKeyword,
    setStatus,
  } = useGetProducts();
  const { visibleProduct } = useVisibleProduct();
  const { deleteProduct } = useDeleteProduct();
  const array = [
    {
      name: "Tất cả",
      status: null,
    },
    {
      name: "Hiện",
      status: 1,
    },
    {
      name: "Ẩn",
      status: 0,
    },
    {
      name: "Hết hàng",
      status: 2,
    },
  ];

  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }
    try {
      await deleteProduct(id);
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
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
    }
  };
  return (
    <>
      <div className="p-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
        <h1 className="font-bold mb-[20px] text-[1.5rem] text-[#74767d]">
          Sản phẩm ({totalItems})
        </h1>

        <Link
          href={"/add-product"}
          className="bg-[#daf4f0] border-0 cursor-pointer text-[0.9rem] font-medium w-[90px] !flex p-[10px_12px] items-center justify-center gap-[5px] text-[#0ab39c] hover:bg-[#0ab39c] hover:text-white"
        >
          <IoMdAddCircle size={22} /> Thêm
        </Link>
      </div>

      <div className="shadow-sm bg-white rounded-[3px] w-full overflow-auto relative">
        <div className="p-[1.2rem] flex justify-between items-center sticky top-0">
          <div className="flex items-center">
            <InputSearch onSearchChange={(val) => setKeyword(val)} />
          </div>
        </div>

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full">
          <thead>
            <tr className="bg-[#E9EDF2]">
              <th className="pl-[1rem] py-[1rem] text-left text-[#444] text-[0.9rem]">
                Sản phẩm
              </th>

              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Giá
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Số lượng tồn kho
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Ngày thêm
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Danh mục
              </th>
              <th className=" text-left text-[#444] text-[0.9rem] relative">
                <FilterDropDownMenu
                  title="Tình trạng"
                  array={array}
                  onFilterChange={(val) => setStatus(val)}
                />
              </th>
              <th className="py-[1rem] text-left text-[#444] text-[0.9rem]">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="w-full">
                  <Loading height={50} />
                </td>
              </tr>
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <tr key={index}>
                  <td className="pl-[1rem] py-[1rem] w-[300px]">
                    <div className="flex gap-[10px] items-center">
                      <div className="cursor-pointer">
                        <Image
                          Src={product.image[0]}
                          Alt={""}
                          ClassName={"w-[75px] cursor-pointer"}
                          loadingType="lazy"
                        />
                      </div>

                      <div className="flex flex-col gap-[5px]">
                        <p className="text-[0.9rem] font-medium  text-[#444]">
                          {product.name}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    <div className="flex flex-col">
                      <span
                        className={` ${
                          product.discount > 0
                            ? "line-through text-gray-400"
                            : "text-black"
                        } `}
                      >
                        {product.price?.toLocaleString("vi-VN")}₫
                      </span>
                      {product.discount > 0 && (
                        <span className="text-black font-semibold">
                          {(product.price - product.discount).toLocaleString(
                            "vi-VN"
                          )}
                          ₫
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {product.totalQuantity}
                  </td>

                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {new Date(product.createdAt).toLocaleDateString("vi-VN")}
                  </td>

                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {product.category.namecategory}/
                    {product.category.gender === 1 ? "Nam" : "Nữ"}
                  </td>

                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    {product.status === 1
                      ? "Hiện"
                      : product.status === 0
                      ? "Ẩn"
                      : "Hết hàng"}
                  </td>

                  <td className="py-[1rem] text-[0.9rem] text-[#444]">
                    <div className="flex items-center gap-[15px]">
                      <button
                        onClick={() =>
                          handleVisible(
                            product._id,
                            product.status === 1 ? 0 : 1
                          )
                        }
                      >
                        {product.status === 1 ? (
                          <FaRegEyeSlash size={22} className="text-[#74767d]" />
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
                      <button onClick={() => handleDelete(product._id)}>
                        <VscTrash size={22} className="text-[#d9534f]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="w-full h-[70vh]">
                  <div className="flex flex-col justify-center items-center">
                    <Image
                      Src={"/assets/other/notfound1.png"}
                      Alt={""}
                      ClassName={"w-[180px]"}
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
