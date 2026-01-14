"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "../../Image";
import { HiOutlineMinusSmall } from "react-icons/hi2";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { LiaRulerHorizontalSolid } from "react-icons/lia";
import MenuSideCoupon from "../../MenuSideCoupon";
import ImageViewer from "../../ImageViewer";
import useGetCoupons from "@/hooks/useGetCoupons";
import toast from "react-hot-toast";
import { Color, Product, Variant } from "@/types/type";
import { GrNext, GrPrevious } from "react-icons/gr";
import useAddCart from "@/hooks/useAddCart";
import useGetCart from "@/hooks/useGetCart";
import { useRemoveItemWishlist } from "@/hooks/useRemoveItemWishlist";
import useGetWishlist from "@/hooks/useGetWishlist";
import useAddWishlist from "@/hooks/useAddWishlist";
import SizeChartModal from "../../SizeChartModal";
import useGetSizes from "@/hooks/useGetSizes";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type Props = {
  product: Product;
};

function ProductDetail({ product }: Props) {
  const max = 15;
  const maxHeight = 200;
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<Variant>();
  const [selectedSize, setSelectedSize] = useState<{
    _id: string;
    namesize: string;
  }>();
  const [selectedColor, setSelectedColor] = useState<Color>();
  const [mainImage, setMainImage] = useState<string>("");
  const [openCouponMenu, setOpenCouponMenu] = useState<boolean>(false);
  const [openSizeChartModal, setOpenSizeChartModal] = useState<boolean>(false);
  const [openViewer, setOpenViewer] = useState<boolean>(false);
  const [viewerImage, setViewerImage] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [expanded, setExpanded] = useState(false);
  const [isLongDescription, setIsLongDescription] = useState(false);

  const { sizes, isLoading: isLoadingSizes } = useGetSizes();
  const { coupons } = useGetCoupons();
  const { wishlist, mutate: mutateWishlist } = useGetWishlist();
  const { mutate: mutateCart } = useGetCart();
  const { addCart, isLoading: isLoadingAddCart } = useAddCart();
  const { addWishlist, isLoading: isLoadingAddWishlist } = useAddWishlist();
  const { removeItem, isLoading: isLoadingRemoveItem } =
    useRemoveItemWishlist();

  useEffect(() => {
    if (product?.variants?.length) {
      setMainImage(product.variants[0].images[0]);
      setSelectedVariant(product.variants[0]);
      setSelectedColor(product.variants[0].color);
    }
  }, [product]);

  useEffect(() => {
    const availableSize = selectedVariant?.inventories.find(
      (inv) => inv.quantity > 0
    );

    if (availableSize) {
      setSelectedSize(availableSize.size);
    } else {
      setSelectedSize(undefined);
    }
  }, [selectedVariant]);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const height = descriptionRef.current.scrollHeight;
      setIsLongDescription(height > maxHeight);
    }
  }, [product?.description]);

  const isInWishlist = useMemo(() => {
    return wishlist?.productsInWishlist?.some(
      (item) => item.variant._id === selectedVariant?._id
    );
  }, [wishlist?.productsInWishlist, selectedVariant?._id]);

  const currentInventory = useMemo(() => {
    return selectedVariant?.inventories.find(
      (inv) => inv.size._id === selectedSize?._id
    );
  }, [selectedVariant, selectedSize?._id]);

  const allImages = useMemo(() => {
    return product?.variants.flatMap((variant) => variant.images) || [];
  }, [product?.variants]);

  const isInStock = useMemo(() => {
    return !!currentInventory?.quantity;
  }, [currentInventory?.quantity]);

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

  const HandleIncrement = () => {
    const maxQuantity =
      currentInventory?.quantity! > max ? max : currentInventory?.quantity!;
    setQuantity((prev) => (prev < maxQuantity ? prev + 1 : prev));
  };

  const HandleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Bạn hãy chọn kích thước!");
      return;
    }

    if (!selectedColor) {
      toast.error("Bạn hãy chọn màu!");
      return;
    }

    if (!isInStock) {
      toast.error("Sản phẩm có kích thước và màu này đã hết hàng");
      return;
    }

    if (!product || !selectedVariant) return;

    try {
      await addCart({
        variant: selectedVariant._id,
        size: selectedSize._id,
        quantity,
      });
      mutateCart();
      toast.success("Đã thêm vào giỏ hàng!");
    } catch (err: any) {
      toast.error(err?.response?.data?.msg);
    }
  };

  const toggleWishlist = async () => {
    if (!selectedVariant || !product) return;

    if (isInWishlist) {
      await removeItem({
        wishlistId: wishlist?._id || "",
        variant: selectedVariant._id,
      });
      toast.success("Đã xóa khỏi yêu thích!");
    } else {
      await addWishlist({ variant: selectedVariant._id });
      toast.success("Đã thêm vào yêu thích!");
    }

    mutateWishlist(undefined, { revalidate: true });
  };

  const handleSelectVariant = (variant: Variant) => {
    setSelectedColor(variant.color);
    setSelectedVariant(variant);
    setMainImage(variant.images?.[0]);
    setQuantity(1);
  };

  const handleSelectVariantSize = (size: { _id: string; namesize: string }) => {
    setSelectedSize(size);
    setQuantity(1);
  };

  const toggleCouponMenu = useCallback(() => {
    setOpenCouponMenu((prev) => !prev);
  }, []);

  const toggleSizeChartModal = useCallback(() => {
    setOpenSizeChartModal((prev) => !prev);
  }, []);

  return (
    <section className="w-full mb-[40px]">
      <div className="mx-auto w-full max-w-[1230px]">
        <div className="flex flex-col lg:flex-row gap-x-[15px] gap-y-[30px] w-full">
          <div className="flex-1/6" id="div1">
            <div className="lg:items-start items-center flex lg:flex-row flex-col-reverse gap-3 flex-1/6 lg:sticky lg:top-[100px]">
              <div className="lg:w-[70px] w-full lg:flex-shrink-0 lg:px-0 px-[15px]">
                <Swiper
                  slidesPerView="auto"
                  spaceBetween={10}
                  className="lg:max-h-[600px] w-full flex justify-center 
                  [&&_.swiper-wrapper]:flex 
                  [&&_.swiper-wrapper]:justify-center"
                  direction={isLargeScreen ? "vertical" : "horizontal"}
                >
                  {product?.variants.map((variant) =>
                    variant.images.map((img) => (
                      <SwiperSlide
                        key={`${variant._id}-${img}`}
                        className="!w-[70px] !h-[90px] cursor-pointer flex-shrink-0"
                        onMouseEnter={() => {
                          setMainImage(img);
                          const indexOfImage = allImages.indexOf(img);
                          if (indexOfImage !== -1) {
                            setCurrentImageIndex(indexOfImage);
                          }
                        }}
                      >
                        <div
                          className={`border flex items-center justify-center w-full h-full ${
                            mainImage === img
                              ? "border-gray-500"
                              : "border-gray-300"
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
                    ))
                  )}
                </Swiper>
              </div>

              <div
                className="group flex justify-center w-full relative flex-1 cursor-pointer "
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleOpenViewer(mainImage);
                }}
              >
                {mainImage && (
                  <div className="group">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleNextImage();
                      }}
                      className="absolute border right-1.5 top-1/2 w-10 h-10 bg-white rounded-full flex justify-center items-center -translate-y-1/2 z-10 p-2 lg:opacity-0 lg:group-hover:opacity-100 transition duration-300 hover:bg-black hover:text-white"
                    >
                      <GrNext size={20} />
                    </button>

                    <div className="w-full h-full overflow-hidden">
                      <Image
                        Src={mainImage}
                        Alt=""
                        ClassName="w-full h-full object-contain"
                        loadingType="eager"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handlePrevImage;
                      }}
                      className="absolute left-1.5 top-1/2 w-10 h-10 border bg-white rounded-full flex justify-center items-center -translate-y-1/2 z-10 p-2 lg:opacity-0 lg:group-hover:opacity-100 transition duration-300 hover:bg-black hover:text-white"
                    >
                      <GrPrevious size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="relative flex-1 px-[15px]" id="div2">
            <div className="space-y-[10px]">
              <h5 className="font-medium">
                {product?.category?.namecategory} /{" "}
                {product?.category?.gender === 1
                  ? "Nam"
                  : product?.category?.gender === 0
                  ? "Nữ"
                  : ""}
              </h5>

              <h3>{product?.name}</h3>

              <div className="flex items-center gap-[15px]">
                {product && product?.discount > 0 ? (
                  <>
                    <del className="text-[#707072] font-light text-[1.4rem]">
                      {product?.price.toLocaleString("vi-VN")}₫
                    </del>

                    <h3 className="text-[#c00] font-medium">
                      {(product?.price - product?.discount).toLocaleString(
                        "vi-VN"
                      )}
                      ₫
                    </h3>
                  </>
                ) : (
                  <h3 className="font-medium">
                    {product?.price.toLocaleString("vi-VN")}₫
                  </h3>
                )}
              </div>

              <div className="space-y-[20px]">
                {coupons.length > 0 && (
                  <div className="space-y-[8px]">
                    <p className="text-gray-700 font-medium mb-[5px]">
                      Mã giảm giá
                    </p>
                    <div className="flex gap-[12px] flex-wrap w-full">
                      {coupons.map((coupon) => (
                        <div
                          key={coupon._id}
                          className="relative flex rounded-none filter-none min-h-0 overflow-hidden px-0 cursor-pointer
    before:content-[''] before:absolute before:rounded-full before:w-[12px] before:h-[12px] before:bg-white before:border before:border-[#197FB6] before:top-1/2 before:translate-y-[-50%] before:left-[-6px] before:z-[10]
    after:content-[''] after:absolute after:rounded-full after:w-[12px] after:h-[12px] after:bg-white after:border after:border-[#197FB6] after:top-1/2 after:translate-y-[-50%] after:right-[-6px] after:z-[10]"
                          onClick={toggleCouponMenu}
                        >
                          <div className="border border-[#197FB6] text-[#197FB6] px-3 py-[7px] relative text-[0.9rem] font-medium uppercase">
                            {coupon.discountType === 1
                              ? `Giảm ${coupon.discountValue.toLocaleString(
                                  "vi-VN"
                                )}₫`
                              : coupon.discountType === 0
                              ? `Giảm ${coupon.discountValue}%`
                              : ""}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-[8px]">
                  <p className="text-gray-700 font-medium">
                    Màu: {selectedColor?.namecolor}
                  </p>
                  <div className="flex space-x-2">
                    {product?.variants.map((variant) => (
                      <button
                        key={variant.color._id}
                        type="button"
                        title={variant.color.namecolor}
                        onClick={() => handleSelectVariant(variant)}
                        style={{
                          backgroundColor: `${variant.color.codecolor}`,
                        }}
                        className={`w-8 h-8 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-offset-2 ring-red-800
                          ${
                            selectedVariant?._id === variant._id
                              ? "ring-1 ring-offset-2"
                              : ""
                          }
                        `}
                      ></button>
                    ))}
                  </div>
                </div>

                <div className="space-y-[8px]">
                  <div className="flex justify-between">
                    <p className="text-gray-700 font-medium">
                      Kích thước: {selectedSize?.namesize}
                    </p>

                    <button
                      type="button"
                      onClick={toggleSizeChartModal}
                      className="flex gap-[5px] items-center"
                    >
                      <LiaRulerHorizontalSolid size={20} />
                      <span className="uppercase font-medium">
                        Hướng dẫn kích thước
                      </span>
                    </button>
                  </div>

                  <div className="flex space-x-2">
                    {selectedVariant?.inventories.map((inv, index) => {
                      const isSelectedSize = selectedSize?._id === inv.size._id;
                      const isSizeOutOfStock = inv.quantity === 0;

                      return (
                        <button
                          key={index}
                          disabled={isSizeOutOfStock}
                          type="button"
                          onClick={() => handleSelectVariantSize(inv.size)}
                          className={`relative w-[70px] h-[35px] border   font-medium text-[0.95rem] ${
                            isSelectedSize
                              ? "border-black"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          {isSizeOutOfStock && (
                            <span className="absolute inset-0 before:content-[''] before:absolute before:top-1/2 before:left-0 before:border-t before:border-black before:w-full before:rotate-[26.5deg] before:origin-center pointer-events-none"></span>
                          )}
                          <span className="relative z-10">
                            {inv.size.namesize}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="relative flex justify-between items-center max-w-[8rem] border border-gray-300 rounded-sm">
                  <button
                    type="button"
                    onClick={HandleDecrement}
                    disabled={quantity <= 1}
                    className=" p-3 h-11 outline-none"
                  >
                    <HiOutlineMinusSmall size={22} />
                  </button>
                  <input
                    type="number"
                    name="quantity"
                    readOnly
                    className="h-11 text-center w-11 outline-none placeholder:  text-[1rem] font-normal"
                    placeholder="1"
                    min={1}
                    max={
                      currentInventory?.quantity! > max
                        ? max
                        : currentInventory?.quantity!
                    }
                    value={quantity}
                  />
                  <button
                    type="button"
                    onClick={HandleIncrement}
                    disabled={
                      quantity >=
                      (currentInventory?.quantity! > max
                        ? max
                        : currentInventory?.quantity!)
                    }
                    className=" p-3 h-11 outline-none"
                  >
                    <HiOutlinePlusSmall size={22} />
                  </button>
                </div>

                <div className="w-full flex gap-[20px] flex-wrap md:flex-nowrap items-center">
                  <button
                    onClick={handleAddToCart}
                    disabled={isLoadingAddCart}
                    type="submit"
                    className="px-[10px] py-[10px] w-full uppercase text-[0.9rem] font-medium border bg-black text-white hover:bg-[#050708]/80"
                  >
                    Thêm vào giỏ
                  </button>

                  <button
                    disabled={isLoadingAddWishlist || isLoadingRemoveItem}
                    type="button"
                    onClick={toggleWishlist}
                    className={`px-[10px] py-[10px] w-full uppercase flex hover:border-black hover:bg-[#F7F7F7] gap-[5px] justify-center items-center text-[0.9rem] border font-medium  ${
                      isInWishlist
                        ? "bg-[#F7F7F7] border-black"
                        : "bg-transparent border-[#CACACB]"
                    }`}
                  >
                    Yêu thích{" "}
                    <svg viewBox="0 0 256 256" width="18" height="18">
                      <rect fill="none" height="256" width="256" />
                      <path
                        d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                        stroke="currentColor"
                        strokeWidth="18"
                        fill={isInWishlist ? "currentColor" : "none"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-[15px]">
                  <h4 className="font-medium">Mô tả sản phẩm</h4>

                  <div
                    ref={descriptionRef}
                    className={`main-prose relative transition-all duration-300 ${
                      expanded || !isLongDescription
                        ? "max-h-none"
                        : "overflow-hidden"
                    }`}
                    style={
                      !expanded && isLongDescription
                        ? { maxHeight: `${maxHeight}px` }
                        : {}
                    }
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product.description || "",
                      }}
                    />

                    {!expanded && isLongDescription && (
                      <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-white to-transparent"></div>
                    )}
                  </div>

                  {isLongDescription && (
                    <button
                      onClick={() => setExpanded(!expanded)}
                      className="text-blue-600 text-[0.9rem] font-medium w-full"
                    >
                      {expanded ? "Thu gọn" : "Xem thêm"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {openSizeChartModal && !isLoadingSizes && (
            <SizeChartModal
              sizes={sizes}
              onToggleMenu={toggleSizeChartModal}
              isOpen={openSizeChartModal}
            />
          )}

          <MenuSideCoupon
            onToggleMenu={toggleCouponMenu}
            isOpen={openCouponMenu}
          />

          {openViewer && (
            <ImageViewer
              image={viewerImage}
              open={openViewer}
              onClose={() => setOpenViewer(false)}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
