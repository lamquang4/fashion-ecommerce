"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { useMemo, useState } from "react";
import { Product, Variant } from "@/types/type";
import useAddWishlist from "@/hooks/useAddWishlist";
import useGetWishlist from "@/hooks/useGetWishlist";
import { useRemoveItemWishlist } from "@/hooks/useRemoveItemWishlist";
import ProductCard from "./ProductCard";

interface Props {
  title: string;
  products: Product[];
}
function ProductSlider({ title, products }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<
    Record<string, Variant>
  >({});

  const { wishlist, mutate } = useGetWishlist();
  const { addWishlist } = useAddWishlist();
  const { removeItem } = useRemoveItemWishlist();

  const handleSelectVariant = (productId: string, variant: Variant) => {
    setSelectedVariant((prev) => ({
      ...prev,
      [productId]: variant,
    }));
  };

  const wishlistVariantId = useMemo(() => {
    return new Set(
      wishlist?.productsInWishlist.map((item: any) => item.variant._id)
    );
  }, [wishlist?.productsInWishlist]);

  const toggleWishlist = async (variant: Variant) => {
    const isInWishlist = wishlist?.productsInWishlist?.some(
      (item: any) => item.variant._id === variant._id
    );

    if (isInWishlist) {
      await removeItem({
        wishlistId: wishlist?._id || "",
        variant: variant._id,
      });
    } else {
      await addWishlist({ variant: variant._id });
    }

    await mutate(undefined, { revalidate: true });
  };

  return (
    <>
      {products.length > 0 && (
        <section className="mb-[40px] px-[15px]">
          <div className="mx-auto max-w-[1230px] w-full">
            <h2 className="mb-[20px]">{title}</h2>
            <Swiper
              spaceBetween={12}
              modules={[FreeMode]}
              freeMode={true}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
                1640: {
                  slidesPerView: 4,
                },
              }}
            >
              {products.map((product) => {
                const variant =
                  selectedVariant[product._id] ?? product.variants[0];
                const isInWishlist = wishlistVariantId.has(variant._id);
                return (
                  <SwiperSlide key={product._id}>
                    <ProductCard
                      product={product}
                      variant={variant}
                      isInWishlist={isInWishlist}
                      onToggleWishlist={() => toggleWishlist(variant)}
                      onSelectVariant={handleSelectVariant}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </section>
      )}
    </>
  );
}

export default ProductSlider;
