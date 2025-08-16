"use client";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import AdvancedSearch from "./AdvancedSearch";
import Image from "./Image";
import { VscSettings } from "react-icons/vsc";
import { Category, Product } from "@/types/type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useGetWishlist from "@/hooks/useGetWishlist";
import { useRemoveItemWishlist } from "@/hooks/useRemoveItemWishlist";
import useAddWishlist from "@/hooks/useAddWishlist";
import Loading from "./Loading";

interface Props {
  category?: Category;
  products: Product[];
  isLoading: boolean;
}
function ProductList({ category, products, isLoading }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const search = searchParams.get("q");

  const [advancedSearchOpen, setAdvancedSearchOpen] = useState<boolean>(false);
  const [selectedInventoryIndexes, setSelectedInventoryIndexes] = useState<
    Record<string, number>
  >({});

  const { wishlist, mutate } = useGetWishlist();
  const { addWishlist } = useAddWishlist();
  const { removeItem } = useRemoveItemWishlist();

  const wishlistVariantId = useMemo(() => {
    return new Set(
      wishlist?.productsInWishlist.map((item: any) => item.variant._id)
    );
  }, [wishlist?.productsInWishlist]);

  const toggleAdvancedSearch = useCallback(() => {
    setAdvancedSearchOpen((prev) => !prev);
  }, []);

  const handleAddToWishlist = async (
    product: Product,
    inventoryIndex: number
  ) => {
    const variant = product.variants[inventoryIndex];

    await addWishlist({
      variant: variant._id,
    });
    mutate();
  };

  const handleRemove = async (product: Product, inventoryIndex: number) => {
    const variant = product.variants[inventoryIndex];
    await removeItem({
      wishlistId: wishlist?._id || "",
      variant: variant._id,
    });
    mutate();
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
    <div className="w-full mx-auto md:max-w-[1000px] lg:max-w-[1240px]">
      <h2 className="text-[1.5rem] sm:text-[1.7rem] font-[550]  mb-[20px]">
        {getTitle()}
      </h2>

      <div className="flex justify-between items-center flex-wrap mb-[35px]">
        <button
          className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.9rem] rounded-sm block p-2 outline-0"
          onClick={toggleAdvancedSearch}
        >
          <span className="flex gap-2 items-center text-[0.9rem] font-medium">
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
        toggleMenu={toggleAdvancedSearch}
      />

      {isLoading ? (
        <Loading height={70} size={50} color="black" thickness={2} />
      ) : products.length > 0 ? (
        <div
          className={`grid grid-cols-2 gap-x-[12px] gap-y-[35px] lg:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 ${
            products.length <= 0 ? "h-[50vh]" : ""
          }`}
        >
          {products.map((product) => {
            const selectedIndex = selectedInventoryIndexes[product._id] || 0;
            const selectedInventory = product.variants[selectedIndex];

            const isInWishlist = wishlistVariantId.has(selectedInventory._id);

            return (
              <div key={product._id}>
                <div className="relative group">
                  <Link href={`/product/${product.slug}`}>
                    {selectedInventory.images[0] && (
                      <Image
                        Src={selectedInventory.images[0]}
                        Alt={product.name}
                        ClassName={
                          "block w-full h-auto object-cover z-[1] relative"
                        }
                        loadingType="lazy"
                      />
                    )}
                    {selectedInventory.images[1] && (
                      <Image
                        Src={selectedInventory.images[1]}
                        Alt={product.name}
                        ClassName={
                          "block w-full h-auto object-cover absolute top-0 left-0 opacity-0 z-[2] transition-opacity duration-300 group-hover:opacity-100"
                        }
                        loadingType="eager"
                      />
                    )}
                  </Link>

                  <div className="flex gap-2 flex-col absolute top-[12px] left-[12px] z-[3] font-semibold text-center text-black">
                    {product.discount > 0 && (
                      <p className="uppercase text-[0.75rem] py-1 px-1.5 bg-white">
                        Giảm giá{" "}
                        {Math.floor((product.discount / product.price) * 100)}%
                      </p>
                    )}
                  </div>

                  <div className="absolute top-[12px] right-[10px] z-[3] font-semibold text-center text-black">
                    <button
                      type="button"
                      className="p-1 transition-colors duration-200 hover:scale-112 text-black"
                      onClick={() => {
                        isInWishlist
                          ? handleRemove(product, selectedIndex)
                          : handleAddToWishlist(product, selectedIndex);
                      }}
                    >
                      <svg viewBox="0 0 256 256" width="22" height="22">
                        <rect fill="none" height="256" width="256" />
                        <path
                          d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                          stroke="currentColor"
                          strokeWidth="16"
                          fill={isInWishlist ? "currentColor" : "none"}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-[14px_2px]">
                  <h2 className="text-[#969696] text-[0.9rem] sm:text-[0.95rem] font-medium uppercase mb-[6px]">
                    {product.category.namecategory} /{" "}
                    {product.category.gender === 1
                      ? "Nam"
                      : product.category.gender === 0
                      ? "Nữ"
                      : ""}
                  </h2>
                  <h2 className="text-black text-[0.9rem] sm:text-[0.95rem] font-medium capitalize mb-[6px]">
                    {product.name}
                  </h2>
                  <div className="flex gap-[10px] text-[0.95rem] sm:text-[1rem] text-black mb-[8px]">
                    {product.discount > 0 && (
                      <del className="text-[#707072]">
                        {product.price.toLocaleString("vi-VN")}₫
                      </del>
                    )}
                    {product.discount > 0 ? (
                      <p className="font-medium text-[#c00]">
                        {(product.price - product.discount).toLocaleString(
                          "vi-VN"
                        )}
                        ₫
                      </p>
                    ) : (
                      <p className="font-medium">
                        {product.price.toLocaleString("vi-VN")}₫
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    {product.variants.map((variant, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          setSelectedInventoryIndexes((prev) => ({
                            ...prev,
                            [product._id]: product.variants.findIndex(
                              (i) => i.color?._id === variant.color?._id
                            ),
                          }))
                        }
                        type="button"
                        title={variant.color?.namecolor}
                        className="w-5.5 h-5.5 border-gray-400 border rounded-full"
                        style={{
                          backgroundColor: variant.color?.codecolor,
                        }}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
          <div>
            <div className="mb-[15px] flex justify-center">
              <Image
                Src={"/assets/other/notfound1.png"}
                Alt={""}
                ClassName={"w-[150px]"}
                loadingType="eager"
              />
            </div>

            <div className="flex justify-center flex-col gap-3 items-center text-center">
              <h2 className="text-[1.1rem] font-medium">
                Không tìm thấy sản phẩm nào
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
