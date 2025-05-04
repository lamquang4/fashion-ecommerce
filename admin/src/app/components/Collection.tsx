"use client";
import React, { useRef, useState } from "react";
import Image from "./Image";
import InputImage1 from "./InputImage1";
import { HiMiniXMark } from "react-icons/hi2";
function Collection() {
  const [image1, setImage1] = useState<string | null>(null);
  const [image2, setImage2] = useState<string | null>(null);

  const inputRef1 = useRef<HTMLInputElement>(null!);
  const inputRef2 = useRef<HTMLInputElement>(null!);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleClear = (
    setImage: React.Dispatch<React.SetStateAction<string | null>>,
    inputRef: React.RefObject<HTMLInputElement>
  ) => {
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
      <form className="flex flex-col gap-7 w-full">
        <h1 className="font-bold text-[1.5rem] text-[#74767d]">Bộ sưu tập</h1>

        <div className="flex gap-[25px] w-full flex-col">
          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[20px]">
              <div className="relative">
                <Image
                  Src={image1 || "/assets/banner/men.png"}
                  Alt={""}
                  ClassName={"h-auto max-w-full"}
                  loadingType="eager"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                  <h2 className="text-[2rem] mb-[10px] font-bold">NAM</h2>
                  <button
                    type="button"
                    className="text-[0.95rem] border border-white p-2 font-medium hover:scale-105"
                  >
                    KHÁM PHÁ NGAY
                  </button>
                </div>

                <div className="flex gap-[15px] absolute top-[20px] right-[20px]">
                  <InputImage1
                    InputId="input1"
                    onChange={(e) => handleImageChange(e, setImage1)}
                    inputRef={inputRef1}
                  />
                  {image1 && (
                    <div className="rounded-full border flex justify-center items-center bg-white">
                      <button type="button" className="  p-2">
                        <HiMiniXMark
                          size={26}
                          onClick={() => handleClear(setImage1, inputRef1)}
                        />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative">
                <Image
                  Src={image2 || "/assets/banner/women.png"}
                  Alt={""}
                  ClassName={"h-auto max-w-full"}
                  loadingType="eager"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                  <h2 className="text-[2rem] mb-[10px] font-bold">NỮ</h2>
                  <button
                    type="button"
                    className="text-[0.95rem] border border-white p-2 font-medium hover:scale-105"
                  >
                    KHÁM PHÁ NGAY
                  </button>
                </div>

                <div className="flex gap-[15px] absolute top-[20px] right-[20px]">
                  <InputImage1
                    InputId="input2"
                    onChange={(e) => handleImageChange(e, setImage2)}
                    inputRef={inputRef2}
                  />
                  {image2 && (
                    <div className="rounded-full border flex justify-center items-center bg-white">
                      <button
                        type="button"
                        className="  p-2"
                        onClick={() => handleClear(setImage2, inputRef2)}
                      >
                        <HiMiniXMark size={26} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
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
        </div>
      </form>
    </div>
  );
}

export default Collection;
