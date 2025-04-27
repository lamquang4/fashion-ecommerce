"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InputImage from "./InputImage";
import ImageViewer from "./ImageViewer";
function AddCategory() {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [showImageViewer, setShowImageViewer] = useState<boolean>(false);

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
  return (
    <>
      <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-full">
        <form className="flex flex-col gap-6 w-full">
          <h1 className="font-bold text-[1.5rem] text-[#74767d]">
            Thêm danh mục
          </h1>

          <div className="flex gap-[20px] w-full flex-col">
            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
              <InputImage isAlotImage={false} InputId="img-category" />
            </div>

            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
              <p className="font-bold text-[1rem] text-[#74767d]">
                Thông tin chung
              </p>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[0.9rem] text-black">
                  Tên danh mục
                </label>
                <input
                  type="text"
                  name="namecate"
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
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
                >
                  <option value="">Chọn giới tính</option>
                  <option value="nam">Nam</option>
                  <option value="nữ">Nữ</option>
                </select>
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
              href="/category"
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

export default AddCategory;
