"use client";
import { HiMiniXMark } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import Overplay from "./Overplay";
import { useRouter, useSearchParams } from "next/navigation";
import useGetColors from "@/hooks/useGetColors";
import { memo } from "react";
type AdvancedSearchProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};
function AdvancedSearch({ isOpen, toggleMenu }: AdvancedSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { colors } = useGetColors();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const minRaw = formData.get("min") as string;
    const maxRaw = formData.get("max") as string;

    const min = parseInt(minRaw, 10);
    const max = parseInt(maxRaw, 10);

    const params = new URLSearchParams(searchParams.toString());

    if (!isNaN(min) && !isNaN(max) && min > max) {
      params.delete("min");
      params.delete("max");
    } else {
      if (!isNaN(min)) params.set("min", min.toString());
      else params.delete("min");

      if (!isNaN(max)) params.set("max", max.toString());
      else params.delete("max");
    }

    const colorValues = formData.getAll("color[]") as string[];

    params.delete("color");

    if (colorValues.length > 0) {
      colorValues.forEach((color) => params.append("color", color));
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`);
    toggleMenu();
  };

  const handleRemovePriceFiler = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("min");
    params.delete("max");
    router.push(`?${params.toString()}`);
  };

  const handleRemoveColorFilter = (color: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const updatedColors = params.getAll("color").filter((c) => c !== color);
    params.delete("color");
    updatedColors.forEach((c) => params.append("color", c));
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-[320px] h-screen bg-white z-[25] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-[0px]" : "translate-x-[-320px]"
        }`}
      >
        <div className="sticky top-0 overflow-hidden p-4 bg-white z-[25] flex justify-between items-center border-b border-gray-200">
          <h2 className="text-[1.25rem] font-semibold">Bộ lọc</h2>
          <button onClick={toggleMenu}>
            <HiMiniXMark size={30} color="black" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-100px)] pb-[60px] custom-scroll ">
          {(searchParams.get("min") ||
            searchParams.get("max") ||
            searchParams.get("color")) && (
            <div className="p-4 border-b border-gray-200">
              <h2 className="block font-semibold text-[1rem] mb-2.5">
                Bộ lọc đã chọn
              </h2>
              <div className="flex items-center flex-wrap gap-3">
                {(searchParams.get("min") || searchParams.get("max")) && (
                  <div className="bg-[#f5f5f5] border border-gray-300 rounded-[4px] p-[9px_10px] flex justify-between items-center gap-1.5 cursor-pointer">
                    <button
                      onClick={() => {
                        handleRemovePriceFiler();
                      }}
                    >
                      <HiMiniXMark size={20} color="black" />
                    </button>
                    <span className="text-[0.9rem]">
                      {searchParams.get("min") &&
                        Number(searchParams.get("min")).toLocaleString(
                          "vi-VN"
                        ) + "₫"}
                      {searchParams.get("min") &&
                        searchParams.get("max") &&
                        " - "}
                      {!searchParams.get("min") &&
                        searchParams.get("max") &&
                        " "}
                      {searchParams.get("max") &&
                        Number(searchParams.get("max")).toLocaleString(
                          "vi-VN"
                        ) + "₫"}
                      {searchParams.get("min") &&
                        !searchParams.get("max") &&
                        " trở lên"}
                      {!searchParams.get("min") &&
                        searchParams.get("max") &&
                        " trở xuống"}
                    </span>
                  </div>
                )}

                {searchParams.getAll("color").map((color) => (
                  <div
                    key={color}
                    className="bg-[#f5f5f5] border border-gray-300 rounded-[4px] p-[9px_10px] flex justify-between items-center gap-1.5 cursor-pointer"
                  >
                    <button onClick={() => handleRemoveColorFilter(color)}>
                      <HiMiniXMark size={20} color="black" />
                    </button>
                    <span className="text-[0.9rem]">{color}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <form id="advanced-search-form" onSubmit={handleSubmit}>
            <div className="border-b border-gray-200 p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="block font-semibold text-[1rem] uppercase">
                  Giá
                </h2>
                <IoIosArrowDown size={18} />
              </div>

              <div className="w-full flex justify-center items-center gap-[10px]">
                <div className="border border-gray-300 p-2.5 w-full">
                  <label
                    htmlFor="min"
                    className="text-sm text-gray-600 block mb-1"
                  >
                    Tối thiểu
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      id="min"
                      className="w-full text-[0.9rem] outline-none border-none p-0"
                      name="min"
                      inputMode="numeric"
                      min={0}
                    />
                    <span className="text-sm text-gray-600">đ</span>
                  </div>
                </div>

                <div className="border border-gray-300 p-2.5 w-full">
                  <label
                    htmlFor="max"
                    className="text-sm text-gray-600 block mb-1"
                  >
                    Tối đa
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      id="max"
                      className="w-full text-[0.9rem] outline-none border-none p-0"
                      name="max"
                      inputMode="numeric"
                      max={1000000}
                    />
                    <span className="text-sm text-gray-600">đ</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="block font-semibold text-[1rem] uppercase">
                  Màu sắc
                </h2>
                <IoIosArrowDown size={18} />
              </div>

              <div className="w-full flex flex-wrap justify-between gap-2.5">
                {colors.map((color, index) => {
                  return (
                    <div className="flex gap-2.5 items-center" key={color._id}>
                      <input
                        type="checkbox"
                        className={`peer relative w-[22px] h-[22px] appearance-none border border-gray-300 cursor-pointer 
              flex items-center justify-center
              checked:after:content-['✔'] checked:after:absolute 
              checked:after:inset-0 checked:after:flex checked:after:items-center 
              checked:after:justify-center checked:after:text-[0.9rem] 
              checked:after:font-bold checked:after:text-[#ffa585]`}
                        name="color[]"
                        id={`color-${index}`}
                        value={color.namecolor}
                        style={{ backgroundColor: color.codecolor }}
                      />
                      <label
                        className="text-[0.9rem]"
                        htmlFor={`color-${index}`}
                      >
                        {color.namecolor}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </form>
        </div>

        <div className="fixed bottom-0 left-0 w-[320px] bg-white z-[30] p-4 flex justify-center">
          <button
            type="submit"
            form="advanced-search-form"
            className="bg-black text-white px-[18px] py-[10px] text-[0.95rem] flex justify-center items-center gap-2.5 font-semibold"
          >
            Áp dụng
            <FaArrowRightLong size={20} />
          </button>
        </div>
      </div>

      {isOpen && <Overplay closeMenu={toggleMenu} IndexForZ={15} />}
    </>
  );
}

export default memo(AdvancedSearch);
