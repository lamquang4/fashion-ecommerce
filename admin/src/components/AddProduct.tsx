"use client";
import Link from "next/link";
import InputImage from "./InputImage";
import TinyMCEEditor from "./TinyMCEEditor";
import { GoTrash } from "react-icons/go";
import { useInventory } from "../hooks/useInventory";
import { useState } from "react";
import useAddProduct from "@/hooks/useAddProduct";
import toast from "react-hot-toast";
import useGetColors from "@/hooks/useGetColors";
import useGetSizes from "@/hooks/useGetSizes";
import useGetCategories1 from "@/hooks/useGetCategories1";

function AddProduct() {
  const { categories } = useGetCategories1();
  const { colors } = useGetColors();
  const { sizes } = useGetSizes();

  const { addProduct } = useAddProduct();

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
  } = useInventory();

  const [data, setData] = useState({
    name: "",
    price: 1,
    discount: 0,
    description: "",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleReset = () => {
    setNewVariants([
      {
        inventories: [{ size: "", quantity: 1 }],
        color: "",
        previewImages: [],
        selectedFiles: [],
      },
    ]);
    setData({
      name: "",
      price: 1,
      discount: 0,
      description: "",
      category: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name.trim());
    formData.append("price", data.price.toString());
    formData.append("discount", data.discount.toString());
    formData.append("description", data.description.trim());
    formData.append("category", data.category);
    formData.append("newInventories", JSON.stringify(newVariants));
    if (!newVariants) {
      toast.error(`Sản phẩm không được để trống tồn kho`);
      return;
    }
    for (let i = 0; i < newVariants.length; i++) {
      const newInventoryBlock = newVariants[i];
      if (
        newInventoryBlock.selectedFiles.length === 0 &&
        !newInventoryBlock.selectedFiles
      ) {
        toast.error(`Biến thể ${i + 1} chưa chọn hình ảnh.`);
        return;
      }

      if (newInventoryBlock.selectedFiles.length > 5) {
        toast.error(`Biến thể ${i + 1} không được vượt quá 5 hình.`);
        return;
      }

      newInventoryBlock.selectedFiles.forEach((file) => {
        formData.append(`images-${i}`, file);
      });
    }

    if (Number(data.price) < Number(data.discount)) {
      toast.error("Giá sản phẩm phải lớn hơn giá giảm");
      return;
    }

    try {
      await addProduct(formData);
      handleReset();
      toast.success("Thêm thành công!");
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  console.log(newVariants);

  return (
    <>
      <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
        <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
          <h1 className="font-bold text-[1.5rem] text-[#74767d]">
            Thêm sản phẩm
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
                    value={data.name}
                    onChange={handleChange}
                    name="name"
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
                    onChange={handleChange}
                    value={data.category}
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((category, index) => (
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

            {newVariants.map((block, index) => (
              <div
                className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full"
                key={index}
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[1rem] text-[#74767d]">
                    Biến thể {index + 1}
                  </p>

                  <button
                    onClick={() => handleRemoveNewInventoryBlock(index)}
                    className="p-1 text-[#FB2C36]"
                    type="button"
                  >
                    <GoTrash size={22} />
                  </button>
                </div>

                <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
                  <InputImage
                    InputId={`img-products-${index}`}
                    previewImages={block.previewImages}
                    handlePreviewImage={(e) => handleImage(e, index)}
                    handleRemovePreviewImage={(i) =>
                      handleRemoveImage(i, index)
                    }
                  />
                </div>

                <div className="flex gap-[15px] mb-[1rem] justify-between items-center">
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
                        return !newVariants.some(
                          (b, i) => i !== index && b.color === color._id
                        );
                      })
                      .map((color, idx) => (
                        <option value={color._id} key={idx}>
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

                    <tbody>
                      {block.inventories.map((newInventory, i) => (
                        <tr key={i}>
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
                                    (inv, j) => j !== i && inv.size === size._id
                                  );
                                })
                                .map((size, idx) => (
                                  <option value={size._id} key={idx}>
                                    {size.namesize}
                                  </option>
                                ))}
                            </select>
                          </td>

                          <td className="py-[1rem]">
                            <input
                              type="number"
                              required
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
                              onClick={() => handleRemoveNewInventory(index, i)}
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
            ))}
          </div>

          <div className="flex justify-center gap-6">
            <button
              type="submit"
              className="p-[6px_10px] bg-teal-500 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-teal-600"
            >
              Thêm
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
    </>
  );
}

export default AddProduct;
