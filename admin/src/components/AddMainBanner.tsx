"use client";
import Link from "next/link";
import InputImage from "./InputImage";
import toast from "react-hot-toast";
import useAddBanner from "@/hooks/useAddBanner";
import { useInputImage } from "@/hooks/useInputImage";

function AddMainBanner() {
  const { addBanner, isLoading } = useAddBanner();

  const {
    previewImages: desktopPreviewImages,
    setPreviewImages: setDesktopPreviewImages,
    selectedFiles: desktopFiles,
    setSelectedFiles: setDesktopFiles,
    handlePreviewImage: handleDesktopPreviewImage,
    handleRemovePreviewImage: handleRemoveDesktopPreviewImage,
  } = useInputImage(5);

  const {
    previewImages: mobilePreviewImages,
    setPreviewImages: setMobilePreviewImages,
    selectedFiles: mobileFiles,
    setSelectedFiles: setMobileFiles,
    handlePreviewImage: handleMobilePreviewImage,
    handleRemovePreviewImage: handleRemoveMobilePreviewImage,
  } = useInputImage(5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (desktopFiles.length === 0) {
      toast.error("Hình banner chính desktop không để trống");
      return;
    }

    if (mobileFiles.length === 0) {
      toast.error("Hình banner chính mobile không để trống");
      return;
    }

    if (
      desktopFiles.length > mobileFiles.length ||
      mobileFiles.length > desktopFiles.length
    ) {
      toast.error("Số lượng ảnh banner desktop và mobile phải bằng nhau");
      return;
    }

    try {
      if (desktopFiles.length > 0) {
        const formData = new FormData();
        desktopFiles.forEach((file) => formData.append("image", file));
        formData.append("type", "0");
        await addBanner(formData);
      }

      if (mobileFiles.length > 0) {
        const formData = new FormData();
        mobileFiles.forEach((file) => formData.append("image", file));
        formData.append("type", "1");
        await addBanner(formData);
      }

      setDesktopPreviewImages([]);
      setDesktopFiles([]);
      setMobilePreviewImages([]);
      setMobileFiles([]);
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
                InputId="desktop-banner"
                previewImages={desktopPreviewImages}
                handlePreviewImage={handleDesktopPreviewImage}
                handleRemovePreviewImage={handleRemoveDesktopPreviewImage}
              />
            </div>

            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <p className="font-bold text-[1rem] text-[#74767d]">
                Banner chính mobile
              </p>

              <InputImage
                InputId="mobile-banner"
                previewImages={mobilePreviewImages}
                handlePreviewImage={handleMobilePreviewImage}
                handleRemovePreviewImage={handleRemoveMobilePreviewImage}
              />
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <button
              disabled={isLoading}
              type="submit"
              className="p-[6px_10px] bg-teal-500 text-white text-[0.9rem]"
            >
              {isLoading ? "Đang thêm..." : "Thêm"}
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
