"use client";
import ImageNext from "next/image";

type ImageProps = {
  Src: string;
  Alt: string;
  ClassName: string;
  loadingType: "lazy" | "eager";
};
function Image({ Src, Alt, ClassName, loadingType }: ImageProps) {
  return (
    <ImageNext
      src={Src}
      alt={Alt}
      unoptimized
      width={0}
      height={0}
      sizes="100vw"
      className={ClassName}
      loading={loadingType}
    />
  );
}

export default Image;
