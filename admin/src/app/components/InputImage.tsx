import React, { useState } from "react";
import Image from "./Image";
import toast from "react-hot-toast";
import { HiMiniXMark } from "react-icons/hi2";
import ImageViewer from "./ImageViewer";
type InputImageProps = {
  isAlotImage: boolean;
  InputId: string;
};
function InputImage({ isAlotImage, InputId }: InputImageProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [openViewer, setOpenViewer] = useState(false);
  const handleOpenViewer = () => {
    setOpenViewer(true);
  };

  const handleRemovePreviewImage = (index: number) => {
    URL.revokeObjectURL(previewImages[index]);
    const newImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(newImages);
  };

  const handlePreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isAlotImage) {
      const files = e.target.files;
      const maxFiles = 4;

      if (!files) return;

      const selectedFiles = Array.from(files);

      if (previewImages.length + selectedFiles.length > maxFiles) {
        toast.error(`Tổng số ảnh không được vượt quá ${maxFiles}.`);
        return;
      }

      const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...imageUrls]);
    } else {
      const files = e.target.files;

      if (!files || files.length === 0) return;

      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setPreviewImages([imageUrl]);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor={InputId}
        className="flex flex-col items-center justify-center w-full h-auto min-h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        {!previewImages.length ? (
          <div className="flex flex-col items-center justify-center py-5">
            <svg
              className="w-12 h-12 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>

            <p className="mb-2 text-[0.9rem] text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Bấm để tải hoặc kéo và thả</span>
            </p>
            <p className="text-[0.8rem] text-gray-500 dark:text-gray-400">
              PNG, JPG, WEBP
            </p>
          </div>
        ) : (
          <div className="flex gap-3 px-[15px] flex-wrap py-5 justify-center">
            {previewImages.map((image, index) => (
              <div className=" relative" key={index}>
                <div
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleOpenViewer();
                  }}
                >
                  <Image
                    Src={image}
                    Alt={""}
                    ClassName="w-full max-w-[280px]"
                  />
                </div>

                <div className="absolute top-[6px] right-[6px]">
                  <button
                    type="button"
                    className="bg-white rounded-full flex justify-center items-center border-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleRemovePreviewImage(index);
                    }}
                  >
                    <HiMiniXMark size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <input
          id={InputId}
          type="file"
          className="hidden"
          accept=".png,.jpg,.webp"
          multiple
          onChange={handlePreviewImage}
        />
      </label>

      {openViewer && (
        <ImageViewer
          images={previewImages}
          open={openViewer}
          onClose={() => setOpenViewer(false)}
        />
      )}
    </div>
  );
}

export default InputImage;
