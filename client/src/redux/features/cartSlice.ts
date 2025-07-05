import { Cart, ProductInCart } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const cartLocalStorage = (): Cart => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("cart");
    if (data) {
      return JSON.parse(data);
    }
  }
  return {
    productsInCart: [],
    total: 0,
  };
};

const initialState: Cart = cartLocalStorage();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // thêm sản phẩm vào giỏ hàng
    addItemToCart: (state, action: PayloadAction<ProductInCart>) => {
      const existingProduct = state.productsInCart.find(
        (product) =>
          product._id === action.payload._id &&
          product.inventory.size._id === action.payload.inventory.size._id &&
          product.inventory.color._id === action.payload.inventory.color._id
      );

      if (existingProduct) {
        existingProduct.inventory.quantity += action.payload.inventory.quantity;
      } else {
        state.productsInCart.push(action.payload);
      }

      // Cập nhật tổng tiền
      const total = state.productsInCart.reduce((sum, item) => {
        return sum + item.price * item.inventory.quantity;
      }, 0);

      state.total = total;
    },

    // xoá sản phẩm khỏi giỏ hàng
    removeItemFromCart: (
      state,
      action: PayloadAction<{ _id: string; sizeId: string; colorId: string }>
    ) => {
      state.productsInCart = state.productsInCart.filter(
        (product) =>
          !(
            product._id === action.payload._id &&
            product.inventory.size._id === action.payload.sizeId &&
            product.inventory.color._id === action.payload.colorId
          )
      );

      // Cập nhật tổng tiền
      state.total = state.productsInCart.reduce((sum, item) => {
        return sum + item.price * item.inventory.quantity;
      }, 0);
    },

    // thay đổi số lượng của sản phẩm trong giỏ hàng
    changeItemQuantity: (
      state,
      action: PayloadAction<{
        _id: string;
        sizeId: string;
        colorId: string;
        quantity: number;
      }>
    ) => {
      const product = state.productsInCart.find(
        (item) =>
          item._id === action.payload._id &&
          item.inventory.size._id === action.payload.sizeId &&
          item.inventory.color._id === action.payload.colorId
      );

      if (product) {
        product.inventory.quantity = action.payload.quantity;

        if (product.inventory.quantity <= 0) {
          // Tự xoá nếu số lượng <= 0
          state.productsInCart = state.productsInCart.filter(
            (item) =>
              !(
                item._id === action.payload._id &&
                item.inventory.size._id === action.payload.sizeId &&
                item.inventory.color._id === action.payload.colorId
              )
          );
        }
      }

      // Cập nhật tổng tiền
      state.total = state.productsInCart.reduce((sum, item) => {
        return sum + item.price * item.inventory.quantity;
      }, 0);
    },
  },
});

export const { addItemToCart, removeItemFromCart, changeItemQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
