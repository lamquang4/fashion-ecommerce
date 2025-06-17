"use client";
import React, { useState } from "react";
import Image from "./Image";
import InputImage1 from "./InputImage1";
import { HiMiniXMark } from "react-icons/hi2";
import useGetCollections from "@/hooks/useGetCollections";
import toast from "react-hot-toast";
import useAddBanner from "@/hooks/useAddBanner";
import useUpdateBanner from "@/hooks/useUpdateBanner";
function Collection() {
  const [images, setImages] = useState<(File | null)[]>([]);
  const [previewImages, setPreviewImages] = useState<(string | null)[]>([]);
  const { collections, fetchCollections } = useGetCollections();
  const { addBanner } = useAddBanner();
  const { updateBanner } = useUpdateBanner();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      images.forEach((file) => file && formData.append("image", file));

      if (collections.length === 0) {
        formData.append("type", "2");
        await addBanner(formData);
      } else {
        for (let i = 0; i < collections.length; i++) {
          const file = images[i];
          if (!file) return;

          const formData = new FormData();
          formData.append("image", file);
          formData.append("_id", collections[i]._id);
          await updateBanner(formData);
        }
      }

      fetchCollections();
      toast.success("Cập nhật thành công!");
      setImages([]);
      setPreviewImages([]);
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };
  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
      <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
        <h1 className="font-bold text-[1.5rem] text-[#74767d]">Bộ sưu tập</h1>

        <div className="flex gap-[25px] w-full flex-col">
          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[20px]">
              {[0, 1].map((index) => {
                const item = collections[index];
                return (
                  <div className="relative" key={index}>
                    <Image
                      Src={
                        previewImages[index] ||
                        item?.image ||
                        "/assets/other/default-banner.png"
                      }
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
                );
              })}
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
