"use client";
import { RiImageEditFill } from "react-icons/ri";
type InputImageProp = {
  InputId: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
};

function InputImage1({ InputId, onChange, inputRef }: InputImageProp) {
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
        onChange={onChange}
        ref={inputRef}
      />
    </div>
  );
}

export default InputImage1;
