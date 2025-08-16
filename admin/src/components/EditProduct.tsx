"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import InputImage from "./InputImage";
import Image from "./Image";
import { VscTrash } from "react-icons/vsc";
import ImageViewer from "./ImageViewer";
import InputImage1 from "./InputImage1";
import { HiMiniXMark } from "react-icons/hi2";
import { useParams, useRouter } from "next/navigation";
import useGetProduct from "@/hooks/useGetProduct";
import toast from "react-hot-toast";
import useGetSizes from "@/hooks/useGetSizes";
import useGetColors from "@/hooks/useGetColors";
import useUpdateProduct from "@/hooks/useUpdateProduct";
import useDeleteImage from "@/hooks/useDeleteImage";
import useUpdateImage from "@/hooks/useUpdateImage";
import useGetCategories1 from "@/hooks/useGetCategories1";
import { GoTrash } from "react-icons/go";
import { useInputImage2 } from "@/hooks/useInputImage2";
import dynamic from "next/dynamic";
import TextBoxEditor from "./TextBoxEditor";
import { useNewInventory } from "@/hooks/useNewInventory";
import { useCurrentInventory } from "@/hooks/useCurrentInventory";

const Sortable = dynamic(
  () => import("react-sortablejs").then((mod) => mod.ReactSortable),
  {
    ssr: false,
  }
);
function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { product, mutate, isLoading } = useGetProduct(id);
  const { categories } = useGetCategories1();
  const { colors } = useGetColors();
  const { sizes } = useGetSizes();
  const { updateProduct, isLoading: isLoadingUpdateProduct } =
    useUpdateProduct(id);
  const { deleteImage, isLoading: isLoadingDeleteImage } = useDeleteImage();
  const { updateImage, isLoading: isLoadingSUpdateImage } = useUpdateImage();

  const {
    previewImages2,
    selectedFiles2,
    setPreviewImages2,
    setSelectedFiles2,
    onFileSelect,
    handleClear,
  } = useInputImage2();

  const {
    newVariants,
    setNewVariants,
    handleRemoveNewInventoryBlock,
    handleAddNewInventory,
    handleChangeNewInventory,
    handleRemoveNewInventory,
    handleRemoveAllNewInventories,
    handleAddInventoryBlock,
    handleRemoveAllInventoryBlocks,
    handleImage,
    handleRemoveImage,
    handleSortNewInventory,
  } = useNewInventory();

  const {
    currentVariants,
    setCurrentVariants,
    handleAddCurrentInventory,
    handleChangeCurrentInventory,
    handleRemoveCurrentInventory,
    handleImageCurrent,
    handleRemoveImageCurrent,
    handleSortCurrentInventory,
  } = useCurrentInventory();

  const [data, setData] = useState({
    name: "",
    price: 1,
    discount: 0,
    description: "",
    category: "",
  });
  const [openViewer, setOpenViewer] = useState<boolean>(false);
  const [viewerImage, setViewerImage] = useState<string>("");

  const handleOpenViewer = (image: string) => {
    setViewerImage(image);
    setOpenViewer(true);
  };

  const handleDeleteImage = async (id: string, img: string) => {
    try {
      await deleteImage(id, img);
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
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

  const handleDescriptionChange = useCallback((val: string) => {
    setData((prev) => ({ ...prev, description: val }));
  }, []);

  const newPreviewImageHandlers = useMemo(() => {
    return newVariants.map((_, blockIndex) => ({
      handlePreviewImage: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleImage(e, blockIndex),
      handleRemovePreviewImage: (index: number) =>
        handleRemoveImage(index, blockIndex),
    }));
  }, [newVariants, handleImage, handleRemoveImage]);

  const currentPreviewImageHandlers = useMemo(() => {
    return currentVariants.map((_, blockIndex) => ({
      handlePreviewImage: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleImageCurrent(e, blockIndex),
      handleRemovePreviewImage: (index: number) =>
        handleRemoveImageCurrent(index, blockIndex),
    }));
  }, [currentVariants, handleImageCurrent, handleRemoveImageCurrent]);

  useEffect(() => {
    if (isLoading) return;

    if (!product) {
      toast.error("Không tìm thấy sản phẩm");
      router.push("/product");
      return;
    }
  }, [product, isLoading, router]);

  useEffect(() => {
    if (product) {
      setData({
        name: product.name,
        price: product.price,
        discount: product.discount,
        description: product.description,
        category: product.category._id!,
      });

      setCurrentVariants(
        product.variants.map((variant: any) => ({
          _id: variant._id,
          color: variant.color._id,
          inventories: variant.inventories.map((inv: any) => ({
            size: inv.size._id,
            quantity: inv.quantity,
          })),
          previewImages: [],
          selectedFiles: [],
        }))
      );
    }
  }, [product, setCurrentVariants]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name.trim());
    formData.append("price", data.price.toString());
    formData.append("discount", data.discount.toString());
    formData.append("description", data.description.trim());
    formData.append("category", data.category);

    if (newVariants) {
      formData.append("newInventories", JSON.stringify(newVariants));

      for (let i = 0; i < newVariants.length; i++) {
        const block = newVariants[i];
        if (!block.selectedFiles || block.selectedFiles.length === 0) {
          toast.error(`Biến thể ${i + 1} chưa chọn hình ảnh.`);
          return;
        }

        if (block.selectedFiles.length > 5) {
          toast.error(`Biến thể ${i + 1} không được vượt quá 5 hình.`);
          return;
        }

        block.selectedFiles.forEach((file) => {
          formData.append(`images-${i}`, file);
        });
      }
    }

    if (currentVariants) {
      formData.append("currentInventories", JSON.stringify(currentVariants));

      for (let i = 0; i < currentVariants.length; i++) {
        const block = currentVariants[i];
        if (block.selectedFiles && block.selectedFiles.length > 0) {
          block.selectedFiles.forEach((file) => {
            formData.append(`images1-${i}`, file);
          });
        }
      }
    }

    if (Number(data.price) < Number(data.discount)) {
      toast.error("Giá sản phẩm phải lớn hơn giá giảm");
      mutate(undefined, true);
      return;
    }

    for (let i = 0; i < selectedFiles2.length; i++) {
      for (let j = 0; j < selectedFiles2[i].length; j++) {
        const file = selectedFiles2[i][j];
        const inventoryId = currentVariants[i]?._id;
        const imageNeedUpdate = product?.variants?.[i]?.images?.[j];

        if (file && inventoryId && imageNeedUpdate) {
          const formData = new FormData();
          formData.append("imageUpdate", file);
          formData.append("imageNeedUpdate", imageNeedUpdate);
          try {
            await updateImage(formData, inventoryId);
          } catch (err: any) {
            toast.error(err?.response?.data?.msg);
            return;
          }
        }
      }
    }

    try {
      await updateProduct(formData);
      setNewVariants([]);
      setPreviewImages2([]);
      setSelectedFiles2([]);
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <>
      <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
        <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
          <h1 className="font-bold text-[1.5rem] text-[#74767d]">
            Chỉnh sửa sản phẩm
          </h1>

          <div className="flex gap-[25px] w-full flex-col">
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
                    {categories.map((category) => (
                      <option value={category._id} key={category._id}>
                        {category.namecategory}-
                        {category.gender === 1
                          ? "Nam"
                          : category.gender === 0
                          ? "Nữ"
                          : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="" className="text-[0.9rem] text-black">
                  Mô tả
                </label>
                <TextBoxEditor
                  content={data.description}
                  onChange={handleDescriptionChange}
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
                    inputMode="numeric"
                    value={data.price}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-[0.9rem] text-black">
                    Số tiền giảm (Giảm giá{" "}
                    {Math.floor((data.discount / data.price) * 100)}%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    inputMode="numeric"
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
                Tồn kho
              </p>
              <div className="flex gap-[15px] mb-[20px] justify-between items-center">
                <button
                  type="button"
                  onClick={handleAddInventoryBlock}
                  className="bg-[#daf4f0] border-0 cursor-pointer text-[0.9rem] font-medium !flex p-[10px_12px] items-center justify-center gap-[5px] text-[#0ab39c] hover:bg-[#0ab39c] hover:text-white"
                >
                  Thêm biến thể
                </button>

                <button
                  type="button"
                  onClick={handleRemoveAllInventoryBlocks}
                  className="bg-red-500 border-0 cursor-pointer text-[0.9rem] font-medium !flex p-[6px_12px] items-center justify-center gap-[5px] text-white"
                >
                  Xóa tất cả
                </button>
              </div>
            </div>

            {currentVariants.map((block, index) => (
              <div
                className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[25px] w-full"
                key={block._id}
              >
                <p className="font-bold text-[1rem] text-[#74767d]">
                  Biến thể {index + 1}
                </p>

                <div className=" bg-white rounded-md flex flex-col gap-[25px] w-full">
                  <InputImage
                    InputId={`img-products-a${index}`}
                    previewImages={block.previewImages}
                    handlePreviewImage={
                      currentPreviewImageHandlers[index].handlePreviewImage
                    }
                    handleRemovePreviewImage={
                      currentPreviewImageHandlers[index]
                        .handleRemovePreviewImage
                    }
                  />

                  <div className="flex gap-3 flex-wrap justify-center">
                    {product?.variants?.[index]?.images?.map(
                      (img, imgIndex) => (
                        <div className="relative" key={imgIndex}>
                          <div
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              handleOpenViewer(img);
                            }}
                          >
                            <Image
                              Src={
                                previewImages2?.[index]?.[imgIndex] ||
                                img ||
                                "/assets/banner/default-banner.jpg"
                              }
                              Alt=""
                              ClassName="w-full max-w-[140px]"
                              loadingType="eager"
                            />
                          </div>

                          <div className="absolute top-[6px] right-[6px]">
                            <div className="flex items-center flex-col gap-2">
                              {!previewImages2?.[index]?.[imgIndex] ? (
                                <>
                                  <button
                                    className="bg-white rounded-full p-1 border border-gray-300"
                                    disabled={isLoadingDeleteImage}
                                    type="button"
                                    onClick={() =>
                                      handleDeleteImage(
                                        product?.variants?.[index]?._id,
                                        img
                                      )
                                    }
                                  >
                                    <VscTrash
                                      size={22}
                                      className="text-[#d9534f]"
                                    />
                                  </button>

                                  <InputImage1
                                    onFileSelect={(file) =>
                                      onFileSelect(file, index, imgIndex)
                                    }
                                    InputId={`c${index}-${imgIndex}`}
                                    sizeIcon={22}
                                  />
                                </>
                              ) : (
                                <button
                                  type="button"
                                  className="p-2"
                                  onClick={() => handleClear(index, imgIndex)}
                                >
                                  <HiMiniXMark size={26} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="flex gap-[15px] justify-between items-center">
                  <button
                    type="button"
                    onClick={() => handleAddCurrentInventory(index)}
                    disabled={block.inventories.length === sizes.length}
                    className="bg-[#daf4f0] border-0 cursor-pointer text-[0.9rem] font-medium !flex p-[10px_12px] items-center justify-center gap-[5px] text-[#0ab39c] hover:bg-[#0ab39c] hover:text-white"
                  >
                    Thêm số lượng
                  </button>
                </div>

                <div>
                  <select
                    name="color"
                    value={block.color}
                    onChange={(e) => {
                      const updated = [...currentVariants];
                      updated[index].color = e.target.value;
                      setCurrentVariants(updated);
                    }}
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400 text-gray-900"
                  >
                    {colors
                      .filter((color) => {
                        const checkColorInCurrent = currentVariants.some(
                          (b, i) => i !== index && b.color === color._id
                        );
                        const checkColorInNew = newVariants.some(
                          (b) => b.color === color._id
                        );
                        return !checkColorInCurrent && !checkColorInNew;
                      })
                      .map((color) => (
                        <option value={color._id} key={color._id}>
                          {color.namecolor} ({color.codecolor})
                        </option>
                      ))}
                  </select>
                </div>

                <div className="bg-white w-full overflow-auto">
                  <table className="border-collapse w-[250%] sm:w-[130%] lg:w-full">
                    <thead>
                      <tr>
                        <th className=" text-left text-[#444] text-[0.9rem] py-[1rem]">
                          Kích thước
                        </th>

                        <th className="text-left text-[#444] text-[0.9rem] py-[1rem]">
                          Số lượng
                        </th>
                        <th className="text-left text-[#444] text-[0.9rem] py-[1rem]">
                          Hành động
                        </th>
                      </tr>
                    </thead>

                    <Sortable
                      tag="tbody"
                      list={block.inventories}
                      setList={(newList) =>
                        handleSortCurrentInventory(index, newList)
                      }
                    >
                      {block.inventories.map((inventory, i) => (
                        <tr key={i} className=" cursor-move">
                          <td className="py-[1rem]">
                            <select
                              name="size"
                              required
                              value={inventory.size}
                              onChange={(e) =>
                                handleChangeCurrentInventory(
                                  index,
                                  i,
                                  "size",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400 text-gray-900"
                            >
                              <option value="">Chọn kích thước</option>
                              {sizes
                                .filter((size) => {
                                  return !block.inventories.some(
                                    (inv, j) => j !== i && inv.size === size._id
                                  );
                                })
                                .map((size) => (
                                  <option value={size._id} key={size._id}>
                                    {size.namesize}
                                  </option>
                                ))}
                            </select>
                          </td>

                          <td className="py-[1rem]">
                            <input
                              type="number"
                              inputMode="numeric"
                              required
                              name="quantity"
                              value={inventory.quantity}
                              min={0}
                              onChange={(e) =>
                                handleChangeCurrentInventory(
                                  index,
                                  i,
                                  "quantity",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400 text-gray-900"
                            />
                          </td>

                          <td className="py-[1rem]">
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveCurrentInventory(index, i)
                              }
                              className="bg-red-500 border-0 cursor-pointer text-[0.9rem] font-medium !flex p-[6px_12px] items-center justify-center gap-[5px] text-white"
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      ))}
                    </Sortable>
                  </table>
                </div>
              </div>
            ))}

            {newVariants.length > 0 &&
              newVariants.map((block, index) => (
                <div
                  className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[25px] w-full"
                  key={index}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[1rem] text-[#74767d]">
                      Biến thể {(product?.variants?.length || 0) + index + 1}
                    </p>

                    <button
                      onClick={() => handleRemoveNewInventoryBlock(index)}
                      className="p-1 text-[#FB2C36]"
                      type="button"
                    >
                      <GoTrash size={22} />
                    </button>
                  </div>

                  <div className=" bg-white rounded-md flex flex-col gap-[25px] w-full">
                    <InputImage
                      InputId={`img-products-${index}`}
                      previewImages={block.previewImages}
                      handlePreviewImage={
                        newPreviewImageHandlers[index].handlePreviewImage
                      }
                      handleRemovePreviewImage={
                        newPreviewImageHandlers[index].handleRemovePreviewImage
                      }
                    />
                  </div>

                  <div className="flex gap-[15px] justify-between items-center">
                    <button
                      type="button"
                      onClick={() => handleAddNewInventory(index)}
                      disabled={block.inventories.length === sizes.length}
                      className="bg-[#daf4f0] border-0 cursor-pointer text-[0.9rem] font-medium !flex p-[10px_12px] items-center justify-center gap-[5px] text-[#0ab39c] hover:bg-[#0ab39c] hover:text-white"
                    >
                      Thêm số lượng
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemoveAllNewInventories(index)}
                      className="bg-red-500 border-0 cursor-pointer text-[0.9rem] font-medium !flex p-[6px_12px] items-center justify-center gap-[5px] text-white"
                    >
                      Xóa tất cả
                    </button>
                  </div>

                  <div>
                    <select
                      name="color"
                      value={block.color}
                      onChange={(e) => {
                        const updated = [...newVariants];
                        updated[index].color = e.target.value;
                        setNewVariants(updated);
                      }}
                      required
                      className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400 text-gray-900"
                    >
                      <option value="">Chọn màu</option>
                      {colors
                        .filter((color) => {
                          const checkColorInNew = newVariants.some(
                            (b, i) => i !== index && b.color === color._id
                          );
                          const checkColorInCurrent = currentVariants.some(
                            (b) => b.color === color._id
                          );
                          return !checkColorInNew && !checkColorInCurrent;
                        })
                        .map((color) => (
                          <option value={color._id} key={color._id}>
                            {color.namecolor} ({color.codecolor})
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="bg-white w-full overflow-auto">
                    <table className="border-collapse w-[250%] sm:w-[130%] lg:w-full border-t border-gray-200">
                      <thead>
                        <tr>
                          <th className=" text-left text-[#444] text-[0.9rem] py-[1rem]">
                            Kích thước
                          </th>

                          <th className="text-left text-[#444] text-[0.9rem] py-[1rem]">
                            Số lượng
                          </th>
                          <th className="text-left text-[#444] text-[0.9rem] py-[1rem]">
                            Hành động
                          </th>
                        </tr>
                      </thead>

                      <Sortable
                        tag="tbody"
                        list={block.inventories}
                        setList={(newList) =>
                          handleSortNewInventory(index, newList)
                        }
                      >
                        {block.inventories.map((newInventory, i) => (
                          <tr key={i} className=" cursor-move">
                            <td className="py-[1rem]">
                              <select
                                name="size"
                                required
                                value={newInventory.size}
                                onChange={(e) =>
                                  handleChangeNewInventory(
                                    index,
                                    i,
                                    "size",
                                    e.target.value
                                  )
                                }
                                className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400 text-gray-900"
                              >
                                <option value="">Chọn kích thước</option>
                                {sizes
                                  .filter((size) => {
                                    return !block.inventories.some(
                                      (inv, j) =>
                                        j !== i && inv.size === size._id
                                    );
                                  })
                                  .map((size) => (
                                    <option value={size._id} key={size._id}>
                                      {size.namesize}
                                    </option>
                                  ))}
                              </select>
                            </td>

                            <td className="py-[1rem]">
                              <input
                                type="number"
                                required
                                inputMode="numeric"
                                name="quantity"
                                value={newInventory.quantity}
                                onChange={(e) =>
                                  handleChangeNewInventory(
                                    index,
                                    i,
                                    "quantity",
                                    e.target.value
                                  )
                                }
                                min={1}
                                className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400 text-gray-900"
                              />
                            </td>

                            <td className="py-[1rem]">
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveNewInventory(index, i)
                                }
                                className="bg-red-500 border-0 cursor-pointer text-[0.9rem] font-medium !flex p-[6px_12px] items-center justify-center gap-[5px] text-white"
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        ))}
                      </Sortable>
                    </table>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex justify-center gap-6">
            <button
              disabled={isLoadingUpdateProduct}
              type="submit"
              className="p-[6px_10px] bg-teal-500 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-teal-600"
            >
              {isLoadingUpdateProduct || isLoadingSUpdateImage
                ? "Đang cập nhật..."
                : "Cập nhật"}
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
