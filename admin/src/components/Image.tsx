"use client";
type ImageProps = {
  Src: string;
  Alt: string;
  ClassName: string;
  loadingType: "lazy" | "eager";
};
function Image({ Src, Alt, ClassName, loadingType }: ImageProps) {
  return (
    <img src={Src} alt={Alt} className={ClassName} loading={loadingType} />
  );
}

export default Image;

