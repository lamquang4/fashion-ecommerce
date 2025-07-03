"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InputImage from "./InputImage";
import TinyMCEEditor from "./TinyMCEEditor";
import Image from "./Image";
import { VscTrash } from "react-icons/vsc";
import ImageViewer from "./ImageViewer";
import InputImage1 from "./InputImage1";
import { HiMiniXMark } from "react-icons/hi2";
import { useParams } from "next/navigation";
import useGetProduct from "@/hooks/useGetProduct";
import toast from "react-hot-toast";
import useGetSizes from "@/hooks/useGetSizes";
import useGetColors from "@/hooks/useGetColors";
import Loading from "./Loading";
import useUpdateProduct from "@/hooks/useUpdateProduct";
import { useInventory } from "@/hooks/useInventory";
import { useImageViewer1 } from "@/hooks/useImageViewer1";
import { useImageViewer } from "@/hooks/useImageViewer";
import useDeleteImage from "@/hooks/useDeleteImage";
import useUpdateImage from "@/hooks/useUpdateImage";
import useDeleteInventory from "@/hooks/useDeleteInventory";
import useGetCategories1 from "@/hooks/useGetCategories1t";
function EditProduct() {
  const {
    newInventories,
    setNewInventories,
    currentInventories,
    handleAddInventory,
    handleChangeInventory,
    handleChangeCurrentInventory,
    handleRemoveInventory,
    handleRemoveAllInventory,
    handleSendCurrentInventories,
  } = useInventory();

  const {
    selectedFiles1,
    setSelectedFiles1,
    previewImages1,
    setPreviewImages1,
    onFileSelect,
    handleClear,
  } = useImageViewer1(); // cập nhật hình sản phẩm

  const {
    previewImages,
    setPreviewImages,
    selectedFiles,
    setSelectedFiles,
    handlePreviewImage,
    handleRemovePreviewImage,
  } = useImageViewer(5); // thêm hình sản phẩm

  const params = useParams();
  const id = params.id as string;

  const { product, mutate, isLoading } = useGetProduct(id);

  const { categoriesStatus1 } = useGetCategories1();
  const { colors } = useGetColors();
  const { sizes } = useGetSizes();
  const { updateProduct } = useUpdateProduct(id);
  const { deleteImage } = useDeleteImage();
  const { updateImage } = useUpdateImage(id);
  const { deleteInventory } = useDeleteInventory();
  const [data, setData] = useState({
    name: "",
    price: 1,
    discount: 0,
    description: "",
    image: [""],
    category: "",
    inventory: [
      {
        size: "",
        color: "",
        quantity: 1,
      },
    ],
  });
  const [success, setSuccess] = useState(false);
  const [openViewer, setOpenViewer] = useState(false);
  const [viewerImage, setViewerImage] = useState<string>("");

  const handleOpenViewer = (image: string) => {
    setViewerImage(image);
    setOpenViewer(true);
  };

  const handleReset = () => {
    setNewInventories([{ size: "", color: "", quantity: 1 }]);
    setSelectedFiles1([]);
    setPreviewImages1([]);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 100);
  };

  const handleDeleteImage = async (id: string, img: string) => {
    if (data.image.length === 1) {
      toast.error("Sản phẩm chỉ còn 1 hình không được xóa");
      return;
    }

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

  const handleDeleteInventory = async (id: string) => {
    if (product?.inventory.length === 1) {
      toast.error("Không thể xóa vì sản phẩm chỉ còn 1 tồn kho.");
      return;
    }
    try {
      await deleteInventory(id);
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  useEffect(() => {
    if (product) {
      setData({
        name: product.name,
        price: product.price,
        discount: product.discount,
        description: product.description,
        image: Array.isArray(product.image) ? product.image : [],
        category: product.category,
        inventory: product.inventory?.map((i) => ({
          size: i.size,
          color: i.color,
          quantity: i.quantity,
        })),
      });
    }
    if (product?.inventory) {
      handleSendCurrentInventories(product?.inventory);
    }
  }, [product, product?.inventory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name.trim());
    formData.append("price", data.price.toString());
    formData.append("discount", data.discount.toString());
    formData.append("description", data.description.trim());
    formData.append("category", data.category);

    selectedFiles.forEach((file) => {
      formData.append("image", file);
    });

    formData.append("currentInventories", JSON.stringify(currentInventories));
    if (newInventories) {
      formData.append("newInventories", JSON.stringify(newInventories));
    }

    if (Number(data.price) < Number(data.discount)) {
      toast.error("Giá sản phẩm phải lớn hơn giá giảm");
      return;
    }

    for (let i = 0; i < selectedFiles1.length; i++) {
      const file = selectedFiles1[i];
      if (file) {
        const formData = new FormData();
        formData.append("imageUpdate", file);
        formData.append("imageNeedUpdate", data.image[i]);
        await updateImage(formData);
      }
    }

    try {
      await updateProduct(formData);
      toast.success("Cập nhật thành công!");
      handleReset();
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
            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <InputImage
                InputId="img-product"
                success={success}
                previewImages={previewImages}
                handlePreviewImage={handlePreviewImage}
                handleRemovePreviewImage={handleRemovePreviewImage}
                setPreviewImages={setPreviewImages}
                setSelectedFiles={setSelectedFiles}
              />

              <div className="flex gap-3 flex-wrap justify-center">
                {isLoading ? (
                  <Loading height={25} />
                ) : (
                  data.image.map((img, index) => (
                    <div className="relative" key={index}>
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
                            previewImages1[index] ||
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
                          {!previewImages1[index] ? (
                            <>
                              <button
                                type="button"
                                onClick={() => handleDeleteImage(id, img)}
                              >
                                <VscTrash
                                  size={22}
                                  className="text-[#d9534f]"
                                />
                              </button>

                              <InputImage1
                                onFileSelect={(file) =>
                                  onFileSelect(file, index)
                                }
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
                  ))
                )}
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
                    {categoriesStatus1.map((category, index) => (
                      <option value={category._id} key={index}>
                        {category.namecategory}-
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
                    Số tiền giảm
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
              <div className="bg-white w-full overflow-auto flex flex-col gap-3.5">
                <table className="border-collapse w-[250%] sm:w-[130%] lg:w-full">
                  <thead>
                    <tr>
                      <th className="pl-[1rem] text-left text-[#444] text-[0.9rem] py-[1rem]">
                        Kích thước
                      </th>
                      <th className="text-left text-[#444] text-[0.9rem] py-[1rem]">
                        Màu
                      </th>
                      <th className="text-left text-[#444] text-[0.9rem] py-[1rem]">
                        Số lượng
                      </th>
                      <th className="text-left text-[#444] text-[0.9rem] py-[1rem]">
                        Hành động
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentInventories.map((inventory, index) => (
                      <tr key={index}>
                        <td className="pl-[1rem] py-[1rem]">
                          <select
                            name="size"
                            value={inventory.size}
                            required
                            onChange={(e) =>
                              handleChangeCurrentInventory(
                                index,
                                "size",
                                e.target.value
                              )
                            }
                            className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400 text-gray-900"
                          >
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
                            value={inventory.color}
                            onChange={(e) =>
                              handleChangeCurrentInventory(
                                index,
                                "color",
                                e.target.value
                              )
                            }
                            className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400 text-gray-900"
                          >
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
                            required
                            onChange={(e) =>
                              handleChangeCurrentInventory(
                                index,
                                "quantity",
                                Number(e.target.value)
                              )
                            }
                            value={inventory.quantity}
                            min={1}
                            className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400 text-gray-900"
                          />
                        </td>

                        <td className="py-[1rem]">
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteInventory(inventory._id as string)
                            }
                            className="bg-red-500 border-0 cursor-pointer text-[0.9rem] font-medium !flex p-[6px_12px] items-center justify-center gap-[5px] text-white"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex gap-[15px] mb-[10px] justify-between items-center">
                  <button
                    type="button"
                    onClick={handleAddInventory}
                    disabled={
                      newInventories.length + currentInventories.length >= 30
                    }
                    className="bg-[#daf4f0] border-0 cursor-pointer text-[0.9rem] font-medium !flex p-[6px_10px] items-center justify-center gap-[5px] text-[#0ab39c] hover:bg-[#0ab39c] hover:text-white"
                  >
                    Thêm số lượng
                  </button>

                  <button
                    type="button"
                    onClick={handleRemoveAllInventory}
                    className="bg-red-500 border-0 cursor-pointer text-[0.9rem] font-medium !flex p-[6px_10px] items-center justify-center gap-[5px] text-white"
                  >
                    Xóa tất cả
                  </button>
                </div>

                <table className="border-collapse w-[250%] sm:w-[130%] lg:w-full">
                  <thead>
                    <tr>
                      <th className="pl-[1rem] text-left text-[#444] text-[0.9rem] py-[1rem]">
                        Kích thước
                      </th>
                      <th className="text-left text-[#444] text-[0.9rem] py-[1rem]">
                        Màu
                      </th>
                      <th className="text-left text-[#444] text-[0.9rem] py-[1rem]">
                        Số lượng
                      </th>
                      <th className="text-left text-[#444] text-[0.9rem] py-[1rem]">
                        Hành động
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {newInventories.map((newInventory, index) => (
                      <tr key={index}>
                        <td className="pl-[1rem] py-[1rem]">
                          <select
                            name="size"
                            value={newInventory.size}
                            onChange={(e) =>
                              handleChangeInventory(
                                index,
                                "size",
                                e.target.value
                              )
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
                            value={newInventory.color}
                            onChange={(e) =>
                              handleChangeInventory(
                                index,
                                "color",
                                e.target.value
                              )
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
                            value={newInventory.quantity}
                            onChange={(e) =>
                              handleChangeInventory(
                                index,
                                "quantity",
                                Number(e.target.value)
                              )
                            }
                            min={1}
                            className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400 text-gray-900"
                          />
                        </td>

                        <td className="py-[1rem]">
                          <button
                            type="button"
                            onClick={(e) => handleRemoveInventory(index)}
                            className="bg-red-500 border-0 cursor-pointer text-[0.9rem] font-medium !flex p-[6px_12px] items-center justify-center gap-[5px] text-white"
                          >
                            Xóa
                          </button>
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
