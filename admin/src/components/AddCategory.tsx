"use client";
import Link from "next/link";
import React, { useState } from "react";
import InputImage from "./InputImage";
import useAddCategory from "@/hooks/useAddCategory";
import toast from "react-hot-toast";
import { useInputImage } from "@/hooks/useInputImage";

function AddCategory() {
  const [data, setData] = useState({
    namecategory: "",
    gender: "",
  });
  const { addCategory, isLoading } = useAddCategory();

  const {
    previewImages,
    setPreviewImages,
    selectedFiles,
    setSelectedFiles,
    handlePreviewImage,
    handleRemovePreviewImage,
  } = useInputImage(1);

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
    formData.append("namecategory", data.namecategory.trim());
    formData.append("gender", data.gender);
    if (selectedFiles[0]) {
      formData.append("image", selectedFiles[0]);
    }

    if (!selectedFiles) {
      toast.error("Hình danh mục không để trống");
      return;
    }

    try {
      await addCategory(formData);

      setData({
        namecategory: "",
        gender: "",
      });
      setPreviewImages([]);
      setSelectedFiles([]);
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <>
      <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
        <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
          <h2 className="text-[#74767d] capitalize">Thêm danh mục</h2>

          <div className="flex gap-[25px] w-full flex-col">
            <div className="md:p-[25px] p-[15px] bg-white rounded-md w-full">
              <InputImage
                InputId="img-category"
                previewImages={previewImages}
                onPreviewImage={handlePreviewImage}
                onRemovePreviewImage={handleRemovePreviewImage}
                blockIndex={0}
              />
            </div>

            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
              <h5 className="font-bold text-[#74767d]">
                Thông tin chung
              </h5>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[0.9rem] text-black">
                  Tên danh mục
                </label>
                <input
                  type="text"
                  name="namecategory"
                  value={data.namecategory}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[0.9rem] text-black">
                  Giới tính
                </label>
                <select
                  name="gender"
                  value={data.gender}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                >
                  <option value="">Chọn giới tính</option>
                  <option value="1">Nam</option>
                  <option value="0">Nữ</option>
                </select>
              </div>
            </div>
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
              href="/category"
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

export default AddCategory;
