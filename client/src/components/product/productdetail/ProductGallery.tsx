"use client";
import { memo, useEffect, useMemo, useState } from "react";
import Image from "../../Image";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Variant } from "@/types/type";
import ImageViewer from "@/components/ImageViewer";

type Props = {
  variants: Variant[];
  mainImage: string;
  setMainImage: (img: string) => void;
};

function ProductGallery({ variants, mainImage, setMainImage }: Props) {
  const [openViewer, setOpenViewer] = useState<boolean>(false);
  const [viewerImage, setViewerImage] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  const allImages = useMemo(() => {
    return variants.flatMap((variant) => variant.images);
  }, [variants]);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNextImage = () => {
    if (!allImages.length) return;
    const nextIndex = (currentImageIndex + 1) % allImages.length;
    setCurrentImageIndex(nextIndex);
    setMainImage(allImages[nextIndex]);
  };

  const handlePrevImage = () => {
    if (!allImages.length) return;
    const prevIndex =
      currentImageIndex - 1 < 0 ? allImages.length - 1 : currentImageIndex - 1;

    setCurrentImageIndex(prevIndex);
    setMainImage(allImages[prevIndex]);
  };

  const handleOpenViewer = (image: string) => {
    setViewerImage(image);
    setOpenViewer(true);
  };

  return (
    <>
      <div className="lg:w-[70px] w-full lg:flex-shrink-0 lg:px-0 px-[15px]">
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          className="lg:max-h-[600px] w-full"
          direction={isLargeScreen ? "vertical" : "horizontal"}
        >
          {variants.map((variant) =>
            variant.images.map((img) => (
              <SwiperSlide
                key={`${variant._id}-${img}`}
                className="!w-[70px] !h-[90px] cursor-pointer flex-shrink-0"
                onMouseEnter={() => {
                  setMainImage(img);
                  const index = allImages.indexOf(img);
                  if (index !== -1) setCurrentImageIndex(index);
                }}
              >
                <div
                  className={`border flex items-center justify-center w-full h-full ${
                    mainImage === img ? "border-gray-500" : "border-gray-300"
                  }`}
                >
                  <Image
                    Src={img}
                    Alt=""
                    ClassName="w-full h-full object-contain"
                    loadingType="eager"
                  />
                </div>
              </SwiperSlide>
            )),
          )}
        </Swiper>
      </div>

      <div
        className="group flex justify-center w-full relative flex-1 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleOpenViewer(`${mainImage}`);
        }}
      >
        {mainImage && (
          <div className="group">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute border right-1.5 top-1/2 w-10 h-10 bg-white rounded-full flex justify-center items-center -translate-y-1/2 z-10 p-2 lg:opacity-0 lg:group-hover:opacity-100 transition"
            >
              <GrNext size={20} />
            </button>

            <Image
              Src={mainImage}
              Alt=""
              ClassName="w-full h-full object-contain"
              loadingType="eager"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-1.5 top-1/2 w-10 h-10 border bg-white rounded-full flex justify-center items-center -translate-y-1/2 z-10 p-2 lg:opacity-0 lg:group-hover:opacity-100 transition"
            >
              <GrPrevious size={20} />
            </button>
          </div>
        )}
      </div>

      {openViewer && (
        <ImageViewer
          image={viewerImage}
          open={openViewer}
          onClose={() => setOpenViewer(false)}
        />
      )}
    </>
  );
}
export default memo(ProductGallery);
