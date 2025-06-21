"use client";
import useAddColor from "@/hooks/useAddColor";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

function AddColor() {
  const [data, setData] = useState({
    namecolor: "",
    codecolor: "#000000",
  });

  const { addColor } = useAddColor();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addColor({
        namecolor: data.namecolor.trim(),
        codecolor: data.codecolor,
      });
      toast.success("Thêm thành công!");
      setData({
        namecolor: "",
        codecolor: "",
      });
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-full">
      <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
        <h1 className="font-bold text-[1.5rem] text-[#74767d]">Thêm màu</h1>

        <div className="flex gap-[25px] w-full flex-col">
          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
            <p className="font-bold text-[1rem] text-[#74767d]">
              Thông tin chung
            </p>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem] text-black">
                Tên màu
              </label>
              <input
                type="text"
                name="namecolor"
                value={data.namecolor}
                onChange={handleChange}
                maxLength={20}
                required
                className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-[0.9rem] text-black">
                Chọn màu: {data.codecolor}
              </label>
              <input
                type="color"
                name="codecolor"
                value={data.codecolor}
                onChange={handleChange}
                required
                className="border border-gray-300 p-1 text-[0.9rem] w-full outline-none focus:border-gray-400 text-gray-900"
              />
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
            href="/color"
            className="p-[6px_10px] bg-red-500 text-white text-[0.9rem] text-center rounded-sm"
          >
            Trở về
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddColor;
