"use client";
import React, { useRef, useState } from "react";
import Image from "./Image";
import InputImage1 from "./InputImage1";
import { HiMiniXMark } from "react-icons/hi2";
function PromoteBanner() {
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
        <h1 className="font-bold text-[1.5rem] text-[#74767d]">
          Banner khuyến mãi
        </h1>

        <div className="flex gap-[25px] w-full flex-col">
          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
            <div className="flex flex-col gap-[20px] sm:gap-[30px]">
              <div className="relative">
                <Image
                  Src={image1 || "assets/banner/banner-1.png"}
                  Alt=""
                  ClassName="w-full object-cover"
                  loadingType="eager"
                />

                <div className="flex gap-[15px] absolute top-[20px] right-[20px]">
                  <InputImage1
                    InputId="input1"
                    onChange={(e) => handleImageChange(e, setImage1)}
                    inputRef={inputRef1}
                  />
                  {image1 && (
                    <div className="rounded-full border flex justify-center items-center bg-white">
                      <button
                        type="button"
                        className="  p-2"
                        onClick={() => handleClear(setImage1, inputRef1)}
                      >
                        <HiMiniXMark size={26} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative">
                <Image
                  Src={image2 || "assets/banner/banner-2.png"}
                  Alt=""
                  ClassName="w-full object-cover"
                  loadingType="eager"
                />

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
            className="px-[14px] py-[8px] bg-teal-500 text-white text-[0.9rem] font-medium text-center rounded-sm hover:bg-teal-600"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}

export default PromoteBanner;
