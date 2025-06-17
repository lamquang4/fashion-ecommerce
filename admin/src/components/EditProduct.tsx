"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InputImage from "./InputImage";
import TinyMCEEditor from "./TinyMCEEditor";
import Image from "./Image";
import { VscTrash } from "react-icons/vsc";
import ImageViewer from "./ImageViewer";
import { useVariants } from "../hooks/useVariants";
import InputImage1 from "./InputImage1";
import { HiMiniXMark } from "react-icons/hi2";
import { useParams, useRouter } from "next/navigation";
import useGetProduct from "@/hooks/useGetProduct";
import toast from "react-hot-toast";
import useGetCategories from "@/hooks/useGetCategories";
import useGetSizes from "@/hooks/useGetSizes";
import useGetColors from "@/hooks/useGetColors";
function EditProduct() {
  const {
    variants,
    selected,
    isAllSelected,
    handleSelectAll,
    handleSelectOne,
    handleRemoveSelect,
    handleAddVariant,
    updateVariant,
  } = useVariants();
  const [data, setData] = useState({
    name: "",
    price: 1,
    discount: 0,
    description: "",
    image: [""],
    category: "",
  });
  const [openViewer, setOpenViewer] = useState(false);
  const [viewerImage, setViewerImage] = useState<string>("");
  const [images, setImages] = useState<(File | null)[]>([]);
  const [previewImages, setPreviewImages] = useState<(string | null)[]>([]);
  const handleOpenViewer = (image: string) => {
    setViewerImage(image);
    setOpenViewer(true);
  };

  const onFileSelect = (file: File, index: number) => {
    setPreviewImages((prev) => {
      // giải phóng URL cũ
      if (prev[index]) URL.revokeObjectURL(prev[index]!);
      const updated = [...prev];
      updated[index] = URL.createObjectURL(file);
      return updated;
    });

    setImages((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });
  };

  const handleClear = (index: number) => {
    setPreviewImages((prev) => {
      if (prev[index]) URL.revokeObjectURL(prev[index]!);
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });

    setImages((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const product = useGetProduct(id);

  useEffect(() => {
    if (product) {
      setData({
        name: product.name,
        price: product.price,
        discount: product.discount,
        description: product.description,
        image: Array.isArray(product.image) ? product.image : [],
        category: product.category,
      });
    } else if (id && !product) {
      const timeout = setTimeout(() => {
        toast.error("Không tìm thấy sản phẩm");
        router.push("/product");
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [product, router, id]);

  const { categories } = useGetCategories();
  const { colors } = useGetColors();
  const { sizes } = useGetSizes();

  return (
    <>
      <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
        <form className="flex flex-col gap-7 w-full">
          <h1 className="font-bold text-[1.5rem] text-[#74767d]">
            Chỉnh sửa sản phẩm
          </h1>

          <div className="flex gap-[25px] w-full flex-col">
            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <InputImage max={5} InputId="img-product" />

              <div className="flex gap-3 flex-wrap justify-center">
                {data.image.map((img, index) => (
                  <div className=" relative" key={index}>
                    <div
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleOpenViewer(img);
                      }}
                    >
                      <Image
                        Src={previewImages[index] || img}
                        Alt={""}
                        ClassName="w-full max-w-[140px]"
                        loadingType="eager"
                      />
                    </div>

                    <div className="absolute top-[6px] right-[6px]">
                      <div className="flex items-center flex-col gap-2">
                        {!previewImages[index] ? (
                          <>
                            <button type="button">
                              <VscTrash size={22} className="text-[#d9534f]" />
                            </button>

                            <InputImage1
                              onFileSelect={(file) => onFileSelect(file, index)}
                              InputId={`c${index}`}
                            />
                          </>
                        ) : (
                          <button
                            type="button"
                            className="p-2"
                            onClick={() => handleClear(index)}
                          >
                            <HiMiniXMark size={26} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <p className="font-bold text-[1rem] text-[#74767d] mb-[10px]">
                Thông tin chung
              </p>

              <div className="flex flex-wrap md:flex-nowrap gap-[15px]">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-[0.9rem] text-black">
                    Tên sản phẩm
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-[0.9rem] text-black">
                    Danh mục
                  </label>
                  <select
                    name="category"
                    required
                    value={data.category}
                    onChange={handleChange}
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((category, index) => (
                      <option value={category._id} key={index}>
                        {category.namecategory} -
                        {category.gender === 1 ? "Nam" : "Nữ"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[0.9rem] text-black">
                  Mô tả
                </label>
                <TinyMCEEditor
                  text={data.description}
                  onChange={(value) =>
                    setData((prev) => ({ ...prev, description: value }))
                  }
                />
              </div>
            </div>

            <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <p className="font-bold text-[1rem] text-[#74767d] mb-[10px]">
                Giá cả
              </p>

              <div className="flex flex-wrap md:flex-nowrap gap-[15px]">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-[0.9rem] text-black">
                    Giá
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={data.price}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-[0.9rem] text-black">
                    Giá giảm giá
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={data.discount}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                  />
                </div>
              </div>
            </div>

            <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <p className="font-bold text-[1rem] text-[#74767d] mb-[10px]">
                Số lượng
              </p>

              <div className="flex gap-[15px] mb-[20px] justify-between items-center">
                <button
                  type="button"
                  onClick={handleAddVariant}
                  className="bg-[#daf4f0] border-0 cursor-pointer text-[0.9rem] font-medium !flex p-[6px_10px] items-center justify-center gap-[5px] text-[#0ab39c] hover:bg-[#0ab39c] hover:text-white"
                >
                  Thêm số lượng
                </button>

                <button
                  type="button"
                  onClick={handleRemoveSelect}
                  className="bg-red-500 border-0 cursor-pointer text-[0.9rem] font-medium !flex p-[6px_10px] items-center justify-center gap-[5px] text-white"
                >
                  Xóa
                </button>
              </div>

              <div className="bg-white w-full overflow-auto">
                <table className="border-collapse w-[250%] sm:w-[130%] lg:w-full">
                  <thead>
                    <tr>
                      <th className="pl-[1rem] text-left text-[#444] text-[0.9rem] py-[1rem]">
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          onChange={handleSelectAll}
                          name="select-all"
                          className="w-4 h-4 rounded-sm"
                        />
                      </th>
                      <th className="text-left text-[#444] text-[0.9rem] py-[1rem]">
                        Kích thước
                      </th>
                      <th className="text-left text-[#444] text-[0.9rem] py-[1rem]">
                        Màu
                      </th>
                      <th className="text-left text-[#444] text-[0.9rem] py-[1rem]">
                        Số lượng
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {variants.map((variant, index) => (
                      <tr key={index}>
                        <td className="pl-[1rem] py-[1rem]">
                          <input
                            type="checkbox"
                            checked={selected[index]}
                            onChange={() => handleSelectOne(index)}
                            className="w-4 h-4 rounded-sm"
                          />
                        </td>

                        <td className="py-[1rem]">
                          <select
                            name="size"
                            value={variant.size}
                            onChange={(e) =>
                              updateVariant(index, "size", e.target.value)
                            }
                            className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400 text-gray-900"
                          >
                            <option value="">Chọn kích thước</option>
                            {sizes.map((size, index) => (
                              <option value={size._id} key={index}>
                                {size.namesize}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="py-[1rem]">
                          <select
                            name="color"
                            value={variant.color}
                            onChange={(e) =>
                              updateVariant(index, "color", e.target.value)
                            }
                            className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400 text-gray-900"
                          >
                            <option value="">Chọn màu</option>
                            {colors.map((color, index) => (
                              <option value={color._id} key={index}>
                                {color.namecolor}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="py-[1rem]">
                          <input
                            type="number"
                            name="quantity"
                            value={variant.quantity}
                            onChange={(e) =>
                              updateVariant(index, "quantity", e.target.value)
                            }
                            min={1}
                            className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400 text-gray-900"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <button
              type="submit"
              className="p-[6px_10px] bg-teal-500 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-teal-600"
            >
              Cập nhật
            </button>
            <Link
              href="/product"
              className="p-[6px_10px] bg-red-500 text-white text-[0.9rem] text-center rounded-sm"
            >
              Trở về
            </Link>
          </div>
        </form>
      </div>

      {openViewer && (
        <ImageViewer
          image={viewerImage}
          open={openViewer}
          onClose={() => setOpenViewer(false)}
        />
      )}
    </>
  );
}

export default EditProduct;
