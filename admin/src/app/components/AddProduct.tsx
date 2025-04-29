"use client";
import Link from "next/link";
import React, { useState } from "react";
import TiptapEditor from "./TiptapEditor";
import InputImage from "./InputImage";

function AddProduct() {
  const [variants, setVariants] = useState([
    { size: "", color: "", quantity: "1" },
  ]);

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
      setVariants([{ size: "", color: "", quantity: "1" }]);
      setSelected([false]);
    } else {
      setVariants(filteredVariants);
      setSelected(filteredVariants.map(() => false));
    }
  };

  const handleAddVariant = () => {
    setVariants([...variants, { size: "", color: "", quantity: "1" }]);
    setSelected((prev) => [...prev.map(() => false), false]);
  };

  return (
    <>
      <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
        <form className="flex flex-col gap-7 w-full">
          <h1 className="font-bold text-[1.5rem] text-[#74767d]">
            Thêm sản phẩm
          </h1>

          <div className="flex gap-[25px] w-full flex-col">
            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <InputImage isAlotImage={true} InputId="img-product" />
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
                            value={variant.size}
                            onChange={(e) => {
                              const updatedVariants = [...variants];
                              updatedVariants[index].size = e.target.value;
                              setVariants(updatedVariants);
                            }}
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
                            value={variant.color}
                            onChange={(e) => {
                              const updatedVariants = [...variants];
                              updatedVariants[index].color = e.target.value;
                              setVariants(updatedVariants);
                            }}
                            required
                            className="border border-gray-300 p-[6px_10px] text-[0.9rem] outline-none focus:border-gray-400 text-gray-900"
                          >
                            <option value="">Chọn màu</option>
                            <option value="red">Màu đỏ tươi</option>
                            <option value="no">Không có màu</option>
                          </select>
                        </td>

                        <td className="py-[1rem]">
                          <input
                            type="number"
                            name="quantity"
                            value={variant.quantity}
                            onChange={(e) => {
                              const updatedVariants = [...variants];
                              updatedVariants[index].quantity = e.target.value;
                              setVariants(updatedVariants);
                            }}
                            required
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
    </>
  );
}

export default AddProduct;
