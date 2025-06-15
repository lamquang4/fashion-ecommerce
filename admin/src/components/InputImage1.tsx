"use client";
import { RiImageEditFill } from "react-icons/ri";
type InputImageProp = {
  InputId: string;
  onFileSelect: (file: File) => void;
};

function InputImage1({ InputId, onFileSelect }: InputImageProp) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };
  return (
    <div className="rounded-full border flex justify-center items-center bg-white">
      <label htmlFor={InputId} className="cursor-pointer  p-2">
        <RiImageEditFill size={26} />
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

export default InputImage1;
