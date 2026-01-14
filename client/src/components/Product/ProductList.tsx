"use client";
import { useCallback, useMemo, useState } from "react";
import AdvancedSearch from "../AdvancedSearch";
import Image from "../Image";
import { VscSettings } from "react-icons/vsc";
import { Category, Product, Variant } from "@/types/type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useGetWishlist from "@/hooks/useGetWishlist";
import { useRemoveItemWishlist } from "@/hooks/useRemoveItemWishlist";
import useAddWishlist from "@/hooks/useAddWishlist";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  category?: Category;
  products: Product[];
  isLoading: boolean;
  total: number;
}
function ProductList({ category, products, isLoading, total }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const search = searchParams.get("q");

  const [advancedSearchOpen, setAdvancedSearchOpen] = useState<boolean>(false);
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

  const toggleAdvancedSearch = useCallback(() => {
    setAdvancedSearchOpen((prev) => !prev);
  }, []);

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

  const sortArray = [
    {
      name: "Hàng mới",
      sort: "newest",
    },
    {
      name: "Giá (thấp-cao)",
      sort: "price-asc",
    },
    {
      name: "Giá (cao-thấp)",
      sort: "price-desc",
    },
    {
      name: "Bán chạy nhất",
      sort: "bestseller",
    },
  ];

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (sort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const getTitle = () => {
    if (category) {
      return `${category.namecategory} ${
        category.gender === 1 ? "nam" : category.gender === 0 ? "nữ" : ""
      }`;
    }
    if (pathname === "/search" && search) return search;
    if (pathname === "/sale/nam") return "Giảm giá đồ nam";
    if (pathname === "/sale/nu") return "Giảm giá đồ nữ";
    return "";
  };

  return (
    <>
      <h2 className="mb-[20px]">
        {!isLoading && (
          <>
            {getTitle()} ({total})
          </>
        )}
      </h2>

      <div className="flex justify-between items-center flex-wrap mb-[35px]">
        <button
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-sm block p-2 outline-0"
          onClick={toggleAdvancedSearch}
        >
          <span className="flex gap-2 items-center font-medium">
            <VscSettings size={20} /> Bộ lọc
          </span>
        </button>

        <select
          onChange={handleSortChange}
          value={searchParams.get("sort") ?? ""}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.9rem] rounded-sm block p-2 outline-0"
        >
          {sortArray.map((item, index) => (
            <option value={item.sort} key={index}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <AdvancedSearch
        isOpen={advancedSearchOpen}
        onToggleMenu={toggleAdvancedSearch}
      />

      {isLoading ? (
        <div className="grid grid-cols-2 gap-x-[12px] gap-y-[35px] lg:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div
          className={`grid grid-cols-2 gap-x-[12px] gap-y-[35px] lg:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 ${
            products.length <= 0 ? "h-[50vh]" : ""
          }`}
        >
          {products.map((product) => {
            const variant = selectedVariant[product._id] ?? product.variants[0];
            const isInWishlist = wishlistVariantId.has(variant._id);
            return (
              <div key={product._id}>
                <ProductCard
                  product={product}
                  variant={variant}
                  isInWishlist={isInWishlist}
                  onToggleWishlist={() => toggleWishlist(variant)}
                  onSelectVariant={handleSelectVariant}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="flex flex-col justify-center items-center gap-[15px]">
            <Image
              Src={"/assets/other/notfound1.png"}
              Alt={""}
              ClassName={"w-[150px]"}
              loadingType="eager"
            />

            <h4 className="text-gray-600">Không tìm thấy sản phẩm nào</h4>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductList;
