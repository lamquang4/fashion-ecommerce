"use client";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { HiOutlineMinusSmall } from "react-icons/hi2";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import MenuSideCoupon from "../../ui/MenuSideCoupon";
import useGetCoupons from "@/hooks/useGetCoupons";
import toast from "react-hot-toast";
import { Color, Product, Variant } from "@/types/type";
import useAddCart from "@/hooks/useAddCart";
import useGetCart from "@/hooks/useGetCart";
import { useRemoveItemWishlist } from "@/hooks/useRemoveItemWishlist";
import useGetWishlist from "@/hooks/useGetWishlist";
import useAddWishlist from "@/hooks/useAddWishlist";
import SizeChartModal from "../../ui/SizeChartModal";
import useGetSizes from "@/hooks/useGetSizes";
import ProductGallery from "./ProductGallery";
import ProductDescription from "./ProductDescription";
import CouponList from "./CouponList";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import ProductDetailSkeleton from "@/components/skeleton/ProductDetailSkeleton";

type Props = {
  product: Product;
};

function ProductDetail({ product }: Props) {
  const max = 15;
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
      (inv) => inv.quantity > 0,
    );

    if (availableSize) {
      setSelectedSize(availableSize.size);
    } else {
      setSelectedSize(undefined);
    }
  }, [selectedVariant]);

  const isInWishlist = useMemo(() => {
    return wishlist?.productsInWishlist?.some(
      (item) => item.variant._id === selectedVariant?._id,
    );
  }, [wishlist?.productsInWishlist, selectedVariant?._id]);

  const currentInventory = useMemo(() => {
    return selectedVariant?.inventories.find(
      (inv) => inv.size._id === selectedSize?._id,
    );
  }, [selectedVariant, selectedSize?._id]);

  const isInStock = useMemo(() => {
    return !!currentInventory?.quantity;
  }, [currentInventory?.quantity]);

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

  if (!product) return <ProductDetailSkeleton />;

  return (
    <section className="w-full mb-[40px]">
      <div className="mx-auto w-full max-w-[1230px]">
        <div className="flex flex-col lg:flex-row gap-x-[15px] gap-y-[30px] w-full">
          <div className="flex-1/6" id="div1">
            <div className="lg:items-start items-center flex lg:flex-row flex-col-reverse gap-3 flex-1/6 lg:sticky lg:top-[100px]">
              <ProductGallery
                variants={product?.variants}
                mainImage={mainImage}
                setMainImage={setMainImage}
              />
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
                        "vi-VN",
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
                  <CouponList
                    coupons={coupons}
                    onToggleCouponMenu={toggleCouponMenu}
                  />
                )}

                <ColorSelector
                  variants={product?.variants}
                  selectedVariant={selectedVariant}
                  selectedColor={selectedColor}
                  onSelectVariant={handleSelectVariant}
                />

                <SizeSelector
                  selectedVariant={selectedVariant}
                  selectedSize={selectedSize}
                  onSelectSize={handleSelectVariantSize}
                  onOpenSizeChart={toggleSizeChartModal}
                />

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

                <ProductDescription description={product.description} />
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
        </div>
      </div>
    </section>
  );
}

export default memo(ProductDetail);
