"use client";
import Link from "next/link";
import InputImage from "../InputImage";
import { GoTrash } from "react-icons/go";
import { useCallback, useState } from "react";
import useAddProduct from "@/hooks/useAddProduct";
import toast from "react-hot-toast";
import useGetCategories1 from "@/hooks/useGetCategories1";
import dynamic from "next/dynamic";
import { useNewInventory } from "@/hooks/useNewInventory";
import useGetSizes1 from "@/hooks/useGetSizes1";
import useGetColors1 from "@/hooks/useGetColors1";
import TextBoxEditor from "../TextBoxEditor/TextBoxEditor";

const Sortable = dynamic(
  () => import("react-sortablejs").then((mod) => mod.ReactSortable),
  {
    ssr: false,
  }
);
function AddProduct() {
  const { categories } = useGetCategories1();
  const { colors } = useGetColors1();
  const { sizes } = useGetSizes1();

  const { addProduct, isLoading } = useAddProduct();

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

  const [data, setData] = useState({
    name: "",
    price: 1,
    discount: 0,
    description: "",
    category: "",
    status: "",
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

  const handleDescriptionChange = useCallback((val: string) => {
    setData((prev) => ({ ...prev, description: val }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Number(data.price) < Number(data.discount)) {
      toast.error("Số tiền giảm không được lớn hơn giá bán");
      return;
    }

    if (Number(data.discount) < 0) {
      toast.error("Số tiền giảm phải lớn hơn hoặc bằng 0");
      return;
    }

    if (Number(data.price) <= 0) {
      toast.error("Giá bán phải lớn hơn 0");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name.trim());
    formData.append("price", data.price.toString());
    formData.append("discount", data.discount.toString());
    formData.append("description", data.description.trim());
    formData.append("category", data.category);
    formData.append("status", data.status);
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
        status: "",
      });
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <>
      <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
        <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
          <h2 className="text-[#74767d]">Thêm quần áo</h2>

          <div className="flex gap-[25px] w-full flex-col">
            <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <h5 className="font-bold text-[#74767d]">Thông tin chung</h5>

              <div className="flex flex-wrap md:flex-nowrap gap-[15px]">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-[0.9rem] font-medium">
                    Tên
                  </label>
                  <input
                    type="text"
                    value={data.name}
                    onChange={handleChange}
                    name="name"
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-[0.9rem] font-medium">
                    Danh mục
                  </label>
                  <select
                    name="category"
                    required
                    onChange={handleChange}
                    value={data.category}
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((category) => (
                      <option value={category._id} key={category._id}>
                        {category.namecategory}-
                        {category.gender === 1 ? "Nam" : "Nữ"}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-[0.9rem] font-medium">
                    Tình trạng
                  </label>
                  <select
                    name="status"
                    value={data.status}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                  >
                    <option value="">Chọn tình trạng</option>
                    <option value="1">Hiện</option>
                    <option value="0">Ẩn</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[0.9rem] font-medium">
                  Mô tả
                </label>
                <TextBoxEditor
                draftId=""
                  content={data.description}
                  onChange={handleDescriptionChange}
                />
              </div>
            </div>

            <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <h5 className="font-bold text-[#74767d]">Giá cả</h5>

              <div className="flex flex-wrap md:flex-nowrap gap-[15px]">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-[0.9rem] font-medium">
                    Giá
                  </label>
                  <input
                    type="number"
                    name="price"
                    inputMode="numeric"
                    value={data.price}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-[0.9rem] font-medium">
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
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                  />
                </div>
              </div>
            </div>

            <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <h5 className="font-bold text-[#74767d]">Tồn kho</h5>
              <div className="flex gap-[15px] justify-between items-center">
                <button
                  type="button"
                  disabled={newVariants.length > 5}
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

            {newVariants.length > 0 &&
              newVariants.map((block, index) => (
                <div
                  className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[25px] w-full"
                  key={index}
                >
                  <div className="flex gap-[15px] items-center justify-between">
                    <h5 className="font-bold text-[#74767d]">
                      Biến thể {index + 1}
                    </h5>

                    <button
                      onClick={() => handleRemoveNewInventoryBlock(index)}
                      className="p-1 text-[#FB2C36]"
                      type="button"
                    >
                      <GoTrash size={22} />
                    </button>
                  </div>

                  <div className="bg-white rounded-md w-full">
                    <InputImage
                      InputId={`img-products-${index}`}
                      previewImages={block.previewImages}
                      onPreviewImage={handleImage}
                      onRemovePreviewImage={handleRemoveImage}
                      blockIndex={index}
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
                      className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400  "
                    >
                      <option value="">Chọn màu</option>
                      {colors
                        .filter((color) => {
                          return !newVariants.some(
                            (b, i) => i !== index && b.color === color._id
                          );
                        })
                        .map((color) => (
                          <option value={color._id} key={color._id}>
                            {color.namecolor} ({color.codecolor})
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="bg-white w-full overflow-auto">
                    <table className="border-collapse w-[180%] sm:w-[120%] lg:w-full">
                      <thead>
                        <tr className="text-left">
                          <th className="text-[#444] text-[0.9rem] py-[1rem]">
                            Kích thước
                          </th>

                          <th className="text-[#444] text-[0.9rem] py-[1rem]">
                            Số lượng
                          </th>
                          <th className="text-[#444] text-[0.9rem] py-[1rem]">
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
                          <tr key={i} className="cursor-move">
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
                                className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400  "
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
                                name="quantity"
                                inputMode="numeric"
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
                                className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400  "
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
              disabled={isLoading}
              type="submit"
              className="p-[6px_10px] bg-teal-500 text-white text-[0.9rem] font-medium text-center hover:bg-teal-600 rounded-sm"
            >
              {isLoading ? "Đang thêm..." : "Thêm"}
            </button>
            <Link
              href="/product"
              className="p-[6px_10px] bg-red-500 text-white text-[0.9rem] text-center hover:bg-red-600 rounded-sm"
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
