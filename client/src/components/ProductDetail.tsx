"use client";
import React, { useEffect, useState } from "react";
import Image from "./Image";
import { LiaRulerHorizontalSolid } from "react-icons/lia";
import { HiOutlineMinusSmall } from "react-icons/hi2";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import MenuSideCoupon from "./MenuSideCoupon";
import ImageViewer from "./ImageViewer";
import useGetProductSlug from "@/hooks/useGetProductSlug";
import { notFound, useParams } from "next/navigation";
import useGetCoupons from "@/hooks/useGetCoupons";
import toast from "react-hot-toast";
import { Color, Inventory, Size } from "@/types/type";
import { GrNext, GrPrevious } from "react-icons/gr";
import useAddCart from "@/hooks/useAddCart";
import useGetCart from "@/hooks/useGetCart";
import { useRemoveItemWishlist } from "@/hooks/useRemoveItemWishlist";
import useGetWishlist from "@/hooks/useGetWishlist";
import useAddWishlist from "@/hooks/useAddWishlist";

function ProductDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const { product, isLoading } = useGetProductSlug(slug);
  const { coupons } = useGetCoupons();
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedInventory, setSelectedInventory] = useState<Inventory>();
  const [selectedSize, setSelectedSize] = useState<Size>();
  const [selectedColor, setSelectedColor] = useState<Color>();
  const [mainImage, setMainImage] = useState<string>("");
  const [isInStock, setIsInStock] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [openViewer, setOpenViewer] = useState<boolean>(false);
  const [viewerImage, setViewerImage] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const { addCart } = useAddCart();
  const { addWishlist } = useAddWishlist();
  const { mutate: mutateCart } = useGetCart();
  const { wishlist, mutate: mutateWishlist } = useGetWishlist();
  const { removeItem } = useRemoveItemWishlist();

  const isInWishlist = wishlist?.productsInWishlist?.some(
    (item) => item.variant._id === selectedInventory?._id
  );

  useEffect(() => {
    if (product?.variants && product.variants.length > 0) {
      setMainImage(product.variants[0].images[0]);
      setSelectedColor(product.variants[0].color);
      setSelectedInventory(product.variants[0]);
    }
  }, [product]);

  useEffect(() => {
    if (selectedInventory && selectedSize && selectedColor) {
      const match = selectedInventory.inventories.find(
        (inv) => inv.size._id === selectedSize._id
      );
      if (match?.quantity) {
        setIsInStock(true);
      } else {
        setIsInStock(false);
      }
    }
  }, [selectedInventory, selectedSize, selectedColor]);

  useEffect(() => {
    setSelectedSize(undefined);
  }, [selectedColor]);

  const allImages =
    product?.variants.flatMap((variant) => variant.images) || [];

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

  const toggleOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const HandleIncrement = () => {
    setQuantity((prev) => (prev < 15 ? prev + 1 : prev));
  };

  const HandleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  if (!product && !isLoading) {
    return notFound();
  }

  const handleAddToCart = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    if (!product) {
      return;
    }

    if (!selectedInventory) {
      return;
    }

    const payload = {
      variant: selectedInventory._id,
      size: selectedSize._id,
      quantity: quantity,
    };

    await addCart(payload);
    mutateCart();
    toast.success("Đã thêm vào giỏ hàng!");
  };

  const handleAddToWishlist = async () => {
    if (!selectedInventory || !product) return;

    const payload = {
      variant: selectedInventory._id,
    };

    await addWishlist(payload);
    mutateWishlist();
    toast.success("Đã thêm vào yêu thích!");
  };

  const handleRemove = async () => {
    if (!selectedInventory || !product) return;
    await removeItem({
      wishlistId: wishlist?._id || "",
      variant: selectedInventory._id,
    });
    mutateWishlist();
  };

  return (
    <>
      <section className="w-full mx-auto mt-0 lg:mt-[20px] mb-[40px]">
        <div className="flex justify-center flex-wrap gap-[40px] w-full">
          <div>
            <div className="flex flex-col md:flex-col-reverse xl:flex-row flex-wrap gap-[20px] lg:sticky lg:top-[100px]">
              <div className=" md:order-2 relative grow overflow-hidden bg-white">
                <div className="w-full xl:w-[450px] flex flex-col gap-[20px]">
                  <div className="relative group">
                    <button
                      type="button"
                      onClick={handleNextImage}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 z-10 p-2 opacity-0 group-hover:opacity-100 transition duration-300"
                    >
                      <GrNext size={28} />
                    </button>

                    {mainImage && (
                      <div
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleOpenViewer(mainImage);
                        }}
                      >
                        <Image
                          Src={mainImage}
                          Alt=""
                          ClassName="w-full h-full object-cover "
                          loadingType="eager"
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handlePrevImage}
                      className="absolute left-1.5 top-1/2 -translate-y-1/2 z-10 p-2 opacity-0 group-hover:opacity-100 transition duration-300"
                    >
                      <GrPrevious size={28} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="md:order-1 flex justify-center">
                <div className="max-h-[500px] max-w-[400px] flex flex-row xl:flex-col gap-[15px] overflow-x-auto overflow-y-auto">
                  {product?.variants.map((variant) =>
                    variant.images.map((img, index) => (
                      <div
                        key={index}
                        className="shrink-0 border border-gray-200 overflow-hidden cursor-pointer w-[70px]"
                        onMouseEnter={() => setMainImage(img)}
                      >
                        <Image
                          Src={img}
                          Alt=""
                          ClassName="w-full h-full object-cover"
                          loadingType="eager"
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="relative lg:w-[500px] w-full px-[15px] sm:px-[20px]">
            <div className="py-[10px]">
              <div className="mb-[12px]">
                <p className="text-[1rem] mb-[5px]">
                  {product?.category?.namecategory} /{" "}
                  {product?.category?.gender === 1 ? "Nam" : "Nữ"}
                </p>
                <h2 className="text-[1.3rem] mb-[5px] font-medium">
                  {product?.name}
                </h2>
                <div className="text-[1.5rem] flex gap-[15px] font-semibold">
                  {product?.discount !== 0 && (
                    <del className="text-[#707072] font-light">
                      {product?.price.toLocaleString("vi-VN") || 0}₫
                    </del>
                  )}

                  {product?.discount === 0 && (
                    <span>{product?.price.toLocaleString("vi-VN") || 0}₫</span>
                  )}

                  {product?.discount !== 0 && (
                    <span className="text-[#c00]">
                      {(product &&
                        (product?.price - product?.discount).toLocaleString(
                          "vi-VN"
                        )) ||
                        0}
                      ₫
                    </span>
                  )}
                </div>
              </div>

              <MenuSideCoupon toggleMenu={toggleOpen} isOpen={menuOpen} />

              <form action="" onSubmit={handleAddToCart}>
                {coupons.length > 0 && (
                  <div className="mb-[15px]">
                    <p className="text-gray-700 font-medium mb-[5px]">
                      Mã giảm giá
                    </p>
                    <div className="flex gap-[12px] flex-wrap w-full">
                      {coupons.map((coupon, index) => (
                        <div
                          key={index}
                          className="relative flex rounded-none filter-none min-h-0 overflow-hidden px-0 cursor-pointer
    before:content-[''] before:absolute before:rounded-full before:w-[12px] before:h-[12px] before:bg-white before:border before:border-[#197FB6] before:top-1/2 before:translate-y-[-50%] before:left-[-6px] before:z-[10]
    after:content-[''] after:absolute after:rounded-full after:w-[12px] after:h-[12px] after:bg-white after:border after:border-[#197FB6] after:top-1/2 after:translate-y-[-50%] after:right-[-6px] after:z-[10]"
                          onClick={toggleOpen}
                        >
                          <div className="border border-[#197FB6] text-[#197FB6] px-3 py-[7px] relative text-[0.9rem] font-medium uppercase">
                            {coupon.discountType === 2
                              ? `Giảm ${coupon.discountValue.toLocaleString(
                                  "vi-VN"
                                )}₫`
                              : coupon.discountType === 0
                              ? `Giảm ${coupon.discountValue}%`
                              : "Miễn phí giao hàng"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-[15px]">
                  <p className="text-gray-700 font-medium mb-[5px]">
                    Màu sắc: {selectedColor?.namecolor}
                  </p>
                  <div className="flex space-x-2">
                    {product?.variants.map((inv, index) => (
                      <button
                        key={index}
                        type="button"
                        title={inv.color.namecolor}
                        onClick={() => {
                          setSelectedColor(inv.color);
                          setSelectedInventory(inv);
                          setMainImage(inv.images?.[0]);
                        }}
                        style={{ backgroundColor: `${inv.color.codecolor}` }}
                        className={`w-8 h-8 rounded-full  ${
                          selectedColor?.namecolor === `${inv.color.namecolor}`
                            ? "border border-red-800"
                            : "border-gray-300 border"
                        }`}
                      ></button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col space-y-2 mb-[15px]">
                  <div className="flex justify-between">
                    <p className="text-gray-700 font-medium mb-[5px]">
                      Kích thước: {selectedSize?.namesize}
                    </p>

                    <button
                      type="button"
                      className="flex gap-[6px] items-center"
                    >
                      <LiaRulerHorizontalSolid size={20} />

                      <span className="uppercase text-[0.9rem] underline">
                        Hướng dẫn chọn size
                      </span>
                    </button>
                  </div>

                  <div className="flex space-x-2">
                    {selectedInventory?.inventories.map((inv, index) => {
                      const isSelected = selectedSize?._id === inv.size._id;
                      const isOutOfStock = inv.quantity === 0;

                      return (
                        <button
                          key={index}
                          disabled={isOutOfStock}
                          type="button"
                          onClick={() => setSelectedSize(inv.size)}
                          className={`relative w-[70px] h-[35px] border text-black font-medium text-[0.95rem] ${
                            isSelected
                              ? "border-black"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          {isOutOfStock && (
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

                <div className="mb-[30px] relative flex justify-between items-center max-w-[8rem] border border-gray-300 rounded-sm">
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
                    className="h-11 text-center text-black w-11 outline-none placeholder:text-black text-[1rem] font-normal"
                    placeholder="1"
                    min={1}
                    max={15}
                    value={quantity}
                  />
                  <button
                    type="button"
                    onClick={HandleIncrement}
                    disabled={quantity >= 15}
                    className=" p-3 h-11 outline-none"
                  >
                    <HiOutlinePlusSmall size={22} />
                  </button>
                </div>

                <div className="w-full flex gap-[20px] flex-wrap md:flex-nowrap mb-[30px] items-center">
                  <button
                    type="submit"
                    className="px-[10px] py-[10px] w-full uppercase text-[0.9rem] font-medium border bg-black text-white hover:bg-[#050708]/80"
                  >
                    Thêm vào giỏ
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!selectedInventory || !product) return;

                      if (isInWishlist) {
                        handleRemove();
                      } else {
                        handleAddToWishlist();
                      }
                    }}
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
              </form>

              <div className="flex flex-col gap-y-[30px]">
                <div>
                  <h2 className="text-[1.2rem] font-medium">Mô tả sản phẩm</h2>

                  <hr className="border-1 my-[15px]" />

                  <div
                    className="text-black text-[0.95rem]"
                    dangerouslySetInnerHTML={{
                      __html: product?.description || "",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

export default ProductDetail;
