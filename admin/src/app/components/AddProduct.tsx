"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "./Image";
import toast from "react-hot-toast";
import { FaRegCircleXmark } from "react-icons/fa6";
import ImageViewer from "./ImageViewer";
import TiptapEditor from "./TiptapEditor";

function AddProduct() {
  const [variants, setVariants] = useState([
    { size: "", color: "", quantity: "" },
  ]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [showImageViewer, setShowImageViewer] = useState<boolean>(false);

  const [selected, setSelected] = useState<boolean[]>(
    Array(variants.length).fill(false)
  );

  const isAllSelected = selected.every(Boolean);

  const handleSelectAll = () => {
    setSelected(Array(variants.length).fill(!isAllSelected));
  };

  const handleSelectOne = (index: number) => {
    const updated = [...selected];
    updated[index] = !updated[index];
    setSelected(updated);
  };

  const handleRemoveSelect = () => {
    const filteredVariants = variants.filter((_, index) => !selected[index]);
    if (filteredVariants.length === 0) {
      setVariants([{ size: "", color: "", quantity: "" }]);
      setSelected([false]);
    } else {
      setVariants(filteredVariants);
      setSelected(filteredVariants.map(() => false));
    }
  };

  const handleRemovePreviewImage = (index: number) => {
    URL.revokeObjectURL(previewImages[index]);
    const newImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(newImages);
  };

  useEffect(() => {
    if (showImageViewer) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showImageViewer]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setShowImageViewer(true);
  };

  const handleAddVariant = () => {
    setVariants([...variants, { size: "", color: "", quantity: "" }]);
    setSelected((prev) => [...prev.map(() => false), false]);
  };

  const handlePreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const maxFiles = 4;

    if (!files) return;

    const selectedFiles = Array.from(files);

    if (previewImages.length + selectedFiles.length > maxFiles) {
      toast.error(`Tổng số ảnh không được vượt quá ${maxFiles}.`);
      return;
    }

    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...imageUrls]);
  };

  return (
    <>
      <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
        <form className="flex flex-col gap-6 w-full">
          <h1 className="font-bold text-[1.5rem] text-[#74767d]">
            Thêm sản phẩm
          </h1>

          <div className="flex gap-[20px] w-full flex-col">
            <div className="flex items-center justify-center w-full sm:p-[25px] p-[15px] bg-white rounded-md">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-auto min-h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                {!previewImages.length ? (
                  <div className="flex flex-col items-center justify-center py-5">
                    <svg
                      className="w-12 h-12 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>

                    <p className="mb-2 text-[0.9rem] text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">
                        Bấm để tải hoặc kéo và thả
                      </span>
                    </p>
                    <p className="text-[0.8rem] text-gray-500 dark:text-gray-400">
                      PNG, JPG, WEBP
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-3 px-[15px] flex-wrap py-5 justify-center">
                    {previewImages.map((image, index) => (
                      <div className=" relative" key={index}>
                        <div
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            handleImageClick(image);
                          }}
                        >
                          <Image Src={image} Alt={""} ClassName="w-[150px]" />
                        </div>

                        <div className="absolute top-[6px] right-[6px]">
                          <button
                            type="button"
                            className="text-black bg-white rounded-full"
                            onClick={() => handleRemovePreviewImage(index)}
                          >
                            <FaRegCircleXmark size={22} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept=".png,.jpg,.webp"
                  multiple
                  onChange={handlePreviewImage}
                />
              </label>
            </div>

            <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
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
                    name="nameproduct"
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-[0.9rem] text-black">
                    Giới tính
                  </label>
                  <select
                    name="category"
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="0">Nam</option>
                    <option value="1">Nữ</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-[0.9rem] text-black">
                    Danh mục
                  </label>
                  <select
                    name="category"
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                  >
                    <option value="">Chọn danh mục</option>
                    <option value="">Áo sơ mi</option>
                    <option value="">Áo khoác</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[0.9rem] text-black">
                  Mô tả
                </label>
                <TiptapEditor />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="" className="text-[0.9rem] text-black">
                  Tình trạng
                </label>
                <select
                  name="status"
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                >
                  <option value="">Chọn tình trạng</option>
                  <option value="0">Ẩn </option>
                  <option value="1">Bán ra</option>
                </select>
              </div>
            </div>

            <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
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
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-[0.9rem] text-black">
                    Thuế (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                  />
                </div>
              </div>
            </div>

            <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
              <p className="font-bold text-[1rem] text-[#74767d] mb-[10px]">
                Số lượng
              </p>

              <div className="flex gap-[15px] mb-[20px] justify-between items-center">
                <button
                  type="button"
                  onClick={handleAddVariant}
                  className="bg-[#daf4f0] border-0 cursor-pointer text-[0.9rem] font-medium !flex p-[10px_12px] items-center justify-center gap-[5px] text-[#0ab39c] hover:bg-[#0ab39c] hover:text-white"
                >
                  Thêm số lượng
                </button>

                <button
                  type="button"
                  onClick={handleRemoveSelect}
                  className="bg-red-500 border-0 cursor-pointer text-[0.9rem] font-medium !flex p-[6px_12px] items-center justify-center gap-[5px] text-white"
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
                            name="select-one"
                            className="w-4 h-4 rounded-sm"
                          />
                        </td>
                        <td className="py-[1rem]">
                          <select
                            name="size"
                            required
                            className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400 text-gray-900"
                          >
                            <option value="">Chọn kích thước</option>
                            <option value="XL">XL</option>
                            <option value="L">L</option>
                            <option value="M">M</option>
                            <option value="S">S</option>
                          </select>
                        </td>

                        <td className="py-[1rem]">
                          <select
                            name="color"
                            required
                            className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400 text-gray-900"
                          >
                            <option value="">Chọn màu</option>
                            <option value="XL" className="text-[#FF0000]">
                              Màu đỏ tươi
                            </option>
                            <option value="no">Không có màu</option>
                          </select>
                        </td>

                        <td className="py-[1rem]">
                          <input
                            type="number"
                            name="quantity"
                            required
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

          <div className="flex justify-center gap-6 mt-6">
            <button
              type="submit"
              className="px-[14px] py-[5px] bg-teal-500 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-teal-600"
            >
              Thêm
            </button>
            <Link
              href="/product"
              className="px-[14px] py-[10px] bg-red-500 text-white text-[0.9rem] text-center rounded-sm"
            >
              Trở về
            </Link>
          </div>
        </form>
      </div>

      {showImageViewer && (
        <ImageViewer
          imgSrc={selectedImage}
          closeMenu={() => setShowImageViewer(false)}
        />
      )}
    </>
  );
}

export default AddProduct;
