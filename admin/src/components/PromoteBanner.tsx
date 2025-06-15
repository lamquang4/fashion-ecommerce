"use client";
import React, { useRef, useState } from "react";
import Image from "./Image";
import InputImage1 from "./InputImage1";
import { HiMiniXMark } from "react-icons/hi2";
function PromoteBanner() {
  const [images, setImages] = useState<(File | null)[]>([]);
  const [previewImages, setPreviewImages] = useState<(string | null)[]>([]);

  const array = [
    {
      image: "/assets/banner/banner-1.png",
    },
    {
      image: "/assets/banner/banner-2.png",
    },
  ];

  const onFileSelect = (file: File, index: number) => {
    setPreviewImages((prev) => {
      // giải phóng URL cũ
      if (prev[index]) URL.revokeObjectURL(prev[index]!);
      const updated = [...prev];
      updated[index] = URL.createObjectURL(file);
      return updated;
    });

    setImages((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });
  };

  const handleClear = (index: number) => {
    setPreviewImages((prev) => {
      if (prev[index]) URL.revokeObjectURL(prev[index]!);
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });

    setImages((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
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
              {array.map((item, index) => (
                <div className="relative" key={index}>
                  <Image
                    Src={previewImages[index] || item.image}
                    Alt=""
                    ClassName="w-full object-cover"
                    loadingType="eager"
                  />

                  <div className="flex gap-[15px] absolute top-[20px] right-[20px]">
                    <InputImage1
                      onFileSelect={(file) => onFileSelect(file, index)}
                      InputId={`b${index}`}
                    />
                    {images[index] && (
                      <div className="rounded-full border flex justify-center items-center bg-white">
                        <button
                          type="button"
                          className="p-2"
                          onClick={() => handleClear(index)}
                        >
                          <HiMiniXMark size={26} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
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

export default PromoteBanner;
