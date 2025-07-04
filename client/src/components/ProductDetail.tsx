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
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "@/redux/features/cartSlice";
import toast from "react-hot-toast";
import { Color, ProductInWishlist, Size } from "@/types/type";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "@/redux/features/wishlistSlice";
import { RootState } from "@/redux/store";
function ProductDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const { product, isLoading } = useGetProductSlug(slug);
  const { coupons } = useGetCoupons();
  const [colors, setColors] = useState<Color[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [mainImage, setMainImage] = useState<string>("");
  const [isInStock, setIsInStock] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openViewer, setOpenViewer] = useState(false);
  const [viewerImage, setViewerImage] = useState<string>("");
  const dispatch = useDispatch();

  const wishlist = useSelector(
    (state: RootState) => state.wishlistSlice.productsInWishlist
  );
  const isInWishlist = wishlist.some((item) => item._id === product?._id);

  useEffect(() => {
    if (!selectedColor || !selectedSize || !product?.inventories) {
      setIsInStock(true);
      return;
    }

    const matchingInventory = product.inventories.find(
      (inv) =>
        inv.color.namecolor === selectedColor &&
        inv.size.namesize === selectedSize &&
        inv.quantity > 0
    );

    setIsInStock(!!matchingInventory);
  }, [selectedColor, selectedSize, product]);

  useEffect(() => {
    if (product?.inventories?.length) {
      const uniqueColors = Array.from(
        new Map(
          product.inventories.map((inv) => [inv.color._id, inv.color])
        ).values()
      );

      const uniqueSizes = Array.from(
        new Map(
          product.inventories.map((inv) => [inv.size._id, inv.size])
        ).values()
      );

      setColors(uniqueColors);
      setSizes(uniqueSizes);
    }
  }, [product]);

  useEffect(() => {
    if (product?.image?.length) {
      setMainImage(product.image[0]);
    }
  }, [product]);

  const handleOpenViewer = (image: string) => {
    setViewerImage(image);
    setOpenViewer(true);
  };

  const toggleOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const HandleIncrement = () => {
    setQuantity((prev) => (prev < 90 ? prev + 1 : prev));
  };

  const HandleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  if (!product && !isLoading) {
    return notFound();
  }

  const handleAddToCart = (e: React.FormEvent<HTMLFormElement>) => {
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

    const sizeObj = sizes.find((s) => s.namesize === selectedSize);
    const colorObj = colors.find((c) => c.namecolor === selectedColor);

    if (!sizeObj || !colorObj) return;

    const productToAdd = {
      _id: product._id,
      name: product.name,
      image: product.image,
      slug: product.slug,
      price:
        product.discount !== 0
          ? product.price - product.discount
          : product.price,
      inventories: {
        size: {
          _id: sizeObj._id,
          namesize: sizeObj.namesize,
        },
        color: {
          _id: colorObj._id,
          namecolor: colorObj.namecolor,
          codecolor: colorObj.codecolor,
        },
        quantity: quantity,
      },
    };

    dispatch(addItemToCart(productToAdd));
    toast.success("Đã thêm vào giỏ hàng!");
  };

  const handleAddToWishlist = (product: ProductInWishlist) => {
    const productToAdd = {
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
    };

    dispatch(addItemToWishlist(productToAdd));
  };

  const handleRemove = (product: ProductInWishlist) => {
    dispatch(
      removeItemFromWishlist({
        _id: product._id,
      })
    );
  };

  return (
    <>
      <section className="w-full mx-auto mt-0 lg:mt-[20px] mb-[40px]">
        <div className="flex justify-center flex-wrap gap-[40px] w-full">
          <div>
            <div className="flex flex-col md:flex-col-reverse xl:flex-row flex-wrap gap-[20px] lg:sticky lg:top-[100px]">
              <div className=" md:order-2 relative grow overflow-hidden bg-white">
                <div className="w-full xl:w-[450px] flex flex-col gap-[20px]">
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
                        ClassName="w-full h-full object-cover"
                        loadingType="eager"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="md:order-1 flex justify-center">
                <div className=" max-h-fit flex flex-row xl:flex-col gap-[15px] overflow-x-auto md:overflow-x-hidden md:overflow-y-auto">
                  {product?.image?.map((img, index) => (
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
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative lg:w-[500px] w-full px-[15px] sm:px-[20px]">
            <div className="py-[10px]">
              <div className="mb-[12px]">
                <p className="text-[1rem] mb-[5px]">
                  {product?.category.namecategory} /{" "}
                  {product?.category.gender === 1 ? "Nam" : "Nữ"}
                </p>
                <h2 className="text-[1.3rem] mb-[5px] font-medium">
                  {product?.name}
                </h2>
                <div className="text-[1.5rem] flex gap-[15px] font-medium">
                  {product?.discount !== 0 && (
                    <del className="text-[#707072] font-light">
                      {product?.price.toLocaleString("vi-VN")}₫
                    </del>
                  )}

                  {product?.discount === 0 && (
                    <span>{product?.price.toLocaleString("vi-VN")}₫</span>
                  )}

                  {product?.discount !== 0 && (
                    <span>
                      {product &&
                        (product?.price - product?.discount).toLocaleString(
                          "vi-VN"
                        )}
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
                    Màu sắc: {selectedColor}
                  </p>
                  <div className="flex space-x-2">
                    {colors?.length > 0 &&
                      colors?.map((color, index) => (
                        <button
                          key={index}
                          type="button"
                          title={color?.namecolor}
                          onClick={() => setSelectedColor(color?.namecolor)}
                          style={{ backgroundColor: `${color?.codecolor}` }}
                          className={`w-8 h-8 focus:outline-none  ${
                            selectedColor === `${color.namecolor}`
                              ? "border border-red-600"
                              : "border-gray-300 border"
                          }`}
                        ></button>
                      ))}
                  </div>
                </div>

                <div className="flex flex-col space-y-2 mb-[15px]">
                  <div className="flex justify-between">
                    <p className="text-gray-700 font-medium mb-[5px]">
                      Kích thước: {selectedSize}
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
                    {sizes.length > 0 &&
                      sizes.map((size, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`w-[80px] h-[36px] border text-gray-700 font-medium ${
                            selectedSize === `${size.namesize}`
                              ? "bg-transparent text-black border-black"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                          onClick={() => setSelectedSize(size.namesize)}
                        >
                          {size.namesize}
                        </button>
                      ))}
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
                    max={99}
                    value={quantity}
                  />
                  <button
                    type="button"
                    onClick={HandleIncrement}
                    disabled={quantity >= 99}
                    className=" p-3 h-11 outline-none"
                  >
                    <HiOutlinePlusSmall size={22} />
                  </button>
                </div>

                <div className="w-full flex gap-[20px] flex-wrap md:flex-nowrap mb-[30px] items-center">
                  <button
                    type="submit"
                    disabled={!isInStock}
                    className={`px-[10px] py-[10px] w-full uppercase text-[0.9rem] font-medium border
    ${
      isInStock
        ? "bg-black text-white hover:bg-[#050708]/80"
        : "border-[#197FB6]  text-[#197FB6] cursor-not-allowed"
    }`}
                  >
                    {isInStock ? "Thêm vào giỏ" : "Hết hàng"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (product) {
                        isInWishlist
                          ? handleRemove(product)
                          : handleAddToWishlist(product);
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
