import axios from "axios";

export function useChangeQuantityItemCart() {
  const changeQuantity = async (data: {
    cartId: string;
    variant: string;
    size: string;
    quantity: number;
  }) => {
    try {
      const response = await axios.post("/api/change-quantity-item-cart", data);

      return response.data;
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { changeQuantity };
}
