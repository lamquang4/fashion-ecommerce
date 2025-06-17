"use client";
import Link from "next/link";
import InputImage from "./InputImage";
import TinyMCEEditor from "./TinyMCEEditor";
import { useVariants } from "../hooks/useVariants";
import useGetCategories from "@/hooks/useGetCategories";
import { useState } from "react";
import useAddProduct from "@/hooks/useAddProduct";
import toast from "react-hot-toast";
import useGetColors from "@/hooks/useGetColors";
import useGetSizes from "@/hooks/useGetSizes";
function AddProduct() {
  const [images, setImages] = useState<File[]>([]);
  const [success, setSuccess] = useState(false);

  const { categories } = useGetCategories();
  const { colors } = useGetColors();
  const { sizes } = useGetSizes();

  const { addProduct } = useAddProduct();
  const {
    variants,
    selected,
    isAllSelected,
    handleSelectAll,
    handleSelectOne,
    handleRemoveSelect,
    handleAddVariant,
    updateVariant,
    handleResetVariants,
  } = useVariants();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("discount", data.discount.toString());
    formData.append("description", data.description);
    formData.append("category", data.category);
    images.forEach((image) => {
      formData.append("image", image);
    });
    formData.append("variants", JSON.stringify(variants));

    if (data.price < data.discount) {
      toast.error("Giá sản phẩm phải lớn hơn giá giảm");
      return;
    }

    const seen = new Set<string>();
    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];
      const key = `${variant.size}-${variant.color}`;
      if (seen.has(key)) {
        toast.error(`Sản phẩm này bị trùng size và màu.`);
        return;
      }
      seen.add(key);
    }
    try {
      await addProduct(formData);
      toast.success("Thêm thành công!");
      setData({
        name: "",
        price: 1,
        discount: 0,
        description: "",
        category: "",
      });
      setSuccess(true);
      setImages([]);
      setTimeout(() => {
        handleResetVariants();
        setSuccess(false);
      }, 100);
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <>
      <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
        <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
          <h1 className="font-bold text-[1.5rem] text-[#74767d]">
            Thêm sản phẩm
          </h1>

          <div className="flex gap-[25px] w-full flex-col">
            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <InputImage
                max={5}
                InputId="img-product"
                onFileSelect={(files) => setImages(files)}
                success={success}
              />
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
                            className="w-4 h-4 rounded-sm"
                          />
                        </td>

                        <td className="py-[1rem]">
                          <select
                            name="size"
                            required
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
                            required
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
                            required
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
