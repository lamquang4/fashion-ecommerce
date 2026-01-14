"use client";
import ImageNext from "next/image";

type Props = {
  Src: string;
  Alt: string;
  ClassName: string;
  loadingType: "lazy" | "eager";
};
function Image({ Src, Alt, ClassName, loadingType }: Props) {
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
      priority={loadingType === "eager"}
    />
  );
}

export default Image;
