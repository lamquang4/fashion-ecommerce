"use client";
import Link from "next/link";
import InputImage from "./InputImage";
import toast from "react-hot-toast";
import { useState } from "react";
import useAddBanner from "@/hooks/useAddBanner";
function AddMainBanner() {
  const [desktopImages, setDesktopImages] = useState<File[]>([]);
  const [mobileImages, setMobileImages] = useState<File[]>([]);
  const [success, setSuccess] = useState(false);

  const { addBanner } = useAddBanner();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (desktopImages.length > 0) {
        const formData = new FormData();
        desktopImages.forEach((file) => formData.append("image", file));
        formData.append("type", "0");
        await addBanner(formData);
      }

      if (mobileImages.length > 0) {
        const formData = new FormData();
        mobileImages.forEach((file) => formData.append("image", file));
        formData.append("type", "1");
        await addBanner(formData);
      }
      toast.success("Thêm thành công!");

      setSuccess(true);
      setDesktopImages([]);
      setMobileImages([]);
      setTimeout(() => setSuccess(false), 100);
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <>
      <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
        <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
          <h1 className="font-bold text-[1.5rem] text-[#74767d]">
            Thêm banner chính
          </h1>

          <div className="flex gap-[25px] w-full flex-col">
            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <p className="font-bold text-[1rem] text-[#74767d]">
                Banner chính desktop
              </p>

              <InputImage
                onFileSelect={(files) => setDesktopImages(files)}
                max={5}
                InputId="desktop-banner"
                success={success}
              />
            </div>

            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <p className="font-bold text-[1rem] text-[#74767d]">
                Banner chính mobile
              </p>

              <InputImage
                onFileSelect={(files) => setMobileImages(files)}
                max={5}
                InputId="mobile-banner"
                success={success}
              />
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
              href="/mainbanner"
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

export default AddMainBanner;
