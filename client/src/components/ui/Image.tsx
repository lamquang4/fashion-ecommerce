"use client";
import ImageNext from "next/image";

type Props = {
  src: string;
  alt: string;
  className: string;
  loading: "lazy" | "eager";
};
function Image({ src, alt, className, loading }: Props) {
  return (
    <ImageNext
      src={src}
      alt={alt}
      unoptimized
      width={0}
      height={0}
      sizes="100vw"
      className={className}
      loading={loading}
      priority={loading === "eager"}
    />
  );
}

export default Image;
