"use client";
import Link from "next/link";
import React, { useState } from "react";
import InputImage from "./InputImage";
import Image from "./Image";
import { VscTrash } from "react-icons/vsc";
function EditCategory() {
  const [data, setData] = useState({
    namecategory: "",
    gender: "",
    image: "",
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
  return (
    <>
      <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
        <form className="flex flex-col gap-7 w-full">
          <h1 className="font-bold text-[1.5rem] text-[#74767d]">
            Chỉnh sửa danh mục
          </h1>

          <div className="flex gap-[25px] w-full flex-col">
            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
              <InputImage max={1} InputId="img-category" />

              <div className="flex gap-3 flex-wrap justify-center">
                <div className=" relative">
                  <div>
                    <Image
                      Src={"assets/products/IMGSP0841.png"}
                      Alt={""}
                      ClassName="w-full max-w-[140px]"
                      loadingType="eager"
                    />
                  </div>

                  <div className="absolute top-[6px] right-[6px]">
                    <button>
                      <VscTrash size={22} className="text-[#d9534f]" />
                    </button>
                  </div>
                </div>
              </div>
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
              type="submit"
              className="p-[6px_10px] bg-teal-500 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-teal-600"
            >
              Cập nhật
            </button>
            <Link
              href="/category"
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

export default EditCategory;
