import React from "react";
interface ImageProp {
  Src: string;
  Alt: string;
  ClassName: string;
}
const Image: React.FC<ImageProp> = ({ Src, Alt, ClassName }) => {
  return <img src={Src} alt={Alt} className={ClassName} loading="lazy" />;
};

export default Image;
