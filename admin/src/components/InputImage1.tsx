"use client";
import { memo } from "react";
import { RiImageEditFill } from "react-icons/ri";
type InputImageProp = {
  InputId: string;
  onFileSelect: (file: File) => void;
  sizeIcon: number;
};

function InputImage1({ InputId, onFileSelect, sizeIcon }: InputImageProp) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) onFileSelect(file);
  };

  return (
    <div className="flex justify-center items-center bg-white rounded-full p-1.5 border border-gray-300">
      <label htmlFor={InputId} className="cursor-pointer">
        <RiImageEditFill size={sizeIcon} color="black" />
      </label>

      <input
        type="file"
        className="hidden"
        accept=".png,.jpg,.webp"
        id={InputId}
        onChange={handleChange}
      />
    </div>
  );
}

export default memo(InputImage1);
