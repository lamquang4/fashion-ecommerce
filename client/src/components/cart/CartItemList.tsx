"use client";
import Link from "next/link";
import Image from "../ui/Image";
import { memo, useMemo } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Cart } from "@/types/type";
import CartItem from "./CartItem";

type Props = {
  cart: Cart;
};

function CartItemList({ cart }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const totalQuantity = useMemo(() => {
    return (
      cart?.productsInCart.reduce((sum, item) => {
        return sum + (item?.variant?.quantity || 0);
      }, 0) || 0
    );
  }, [cart?.productsInCart]);

  const totalPrice = useMemo(() => {
    return (
      cart?.productsInCart.reduce((sum, item) => {
        const finalPrice =
          item.discount > 0 ? item.price - item.discount : item.price;

        return sum + finalPrice * item.variant.quantity;
      }, 0) || 0
    );
  }, [cart?.productsInCart]);

  // lấy những sản phẩm không đủ số lượng mua (số lượng mua > số lượng tồn kho)
  const outOfStockItems = useMemo(() => {
    if (!cart?.productsInCart) return [];
    return cart.productsInCart.filter(
      (item) => item.variant.quantity > item.variant.stock,
    );
  }, [cart?.productsInCart]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      toast.error("Vui lòng đăng nhập");
      router.push(`/login`);
      return;
    }

    if (!cart?.productsInCart.length) {
      toast.error("Vui lòng thêm sản phẩm vào giỏ hàng");
      router.push(`/collection/all`);
      return;
    }

    if (outOfStockItems.length > 0) {
      const errorMessage = outOfStockItems
        .map(
          (item) =>
            `Sản phẩm ${item.name} (${item.variant.size.namesize}, ${item.variant.color.namecolor}) chỉ còn ${item.variant.stock}!`,
        )
        .join("\n");
      toast.error(`${errorMessage}`);
      router.push(`/cart`);
      return;
    }

    router.push(`/checkout`);
  };

  return (
    <section className="my-[40px] px-[15px]">
      <div className="max-w-[1230px] mx-auto">
        <h2 className="mb-[20px]">Giỏ hàng ({totalQuantity})</h2>
        {cart?.productsInCart && cart.productsInCart.length > 0 ? (
          <form onSubmit={handleSubmit}>
            <div className="flex gap-8 w-full lg:flex-row flex-col">
              <div className="flex flex-col gap-8 bg-white basis-[70%]">
                {cart?.productsInCart.map((item) => (
                  <CartItem
                    key={`${item._id}-${item.variant._id}-${item.variant.color._id}-${item.variant.size._id}`}
                    item={item}
                    cartId={cart?._id!}
                  />
                ))}
              </div>

              <div className="bg-[#F7F7F7] rounded-sm px-4 py-6 h-auto basis-[30%]">
                <div className="uppercase flex justify-between items-center font-semibold">
                  <h5>Tổng cộng</h5>
                  <h5>{totalPrice.toLocaleString("vi-VN")}₫</h5>
                </div>

                <hr className="border-gray-300 my-[20px]" />

                <div className="space-y-[20px]">
                  <button
                    type="submit"
                    className="text-[0.9rem] px-4 py-2.5 w-full font-semibold tracking-wide bg-slate-900 hover:bg-slate-700 text-white rounded-md"
                  >
                    Thanh toán
                  </button>

                  <Link
                    className="text-[0.9rem] px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-200 text-slate-900 border border-gray-300 rounded-md text-center"
                    href={"/collection/all"}
                  >
                    Tiếp tục mua sắm
                  </Link>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="flex flex-col justify-center items-center gap-[15px]">
              <Image
                src={"/assets/other/empty-cart.png"}
                alt={""}
                className={"w-[150px]"}
                loading="eager"
              />

              <h4 className="text-gray-600">Không có gì trong giỏ hết</h4>

              <Link
                href={"/collection/all"}
                className="text-[0.9rem] border border-black rounded-md font-medium px-3 py-2 hover:bg-black hover:text-white"
              >
                Mua sắm ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default memo(CartItemList);
