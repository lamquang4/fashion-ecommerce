import axios from "axios";

export function useRemoveItemCart() {
  const removeItem = async (data: {
    cartId: string;
    variant: string;
    size: string;
  }) => {
    try {
      const response = await axios.put("/api/remove-item-cart", data);

      return response.data;
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    }
  };

  return { removeItem };
}
