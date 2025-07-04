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
          product.inventories.size._id ===
            action.payload.inventories.size._id &&
          product.inventories.color._id === action.payload.inventories.color._id
      );

      if (existingProduct) {
        existingProduct.inventories.quantity +=
          action.payload.inventories.quantity;
      } else {
        state.productsInCart.push(action.payload);
      }

      // Cập nhật tổng tiền
      const total = state.productsInCart.reduce((sum, item) => {
        return sum + item.price * item.inventories.quantity;
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
            product.inventories.size._id === action.payload.sizeId &&
            product.inventories.color._id === action.payload.colorId
          )
      );

      // Cập nhật tổng tiền
      state.total = state.productsInCart.reduce((sum, item) => {
        return sum + item.price * item.inventories.quantity;
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
          item.inventories.size._id === action.payload.sizeId &&
          item.inventories.color._id === action.payload.colorId
      );

      if (product) {
        product.inventories.quantity = action.payload.quantity;

        if (product.inventories.quantity <= 0) {
          // Tự xoá nếu số lượng <= 0
          state.productsInCart = state.productsInCart.filter(
            (item) =>
              !(
                item._id === action.payload._id &&
                item.inventories.size._id === action.payload.sizeId &&
                item.inventories.color._id === action.payload.colorId
              )
          );
        }
      }

      // Cập nhật tổng tiền
      state.total = state.productsInCart.reduce((sum, item) => {
        return sum + item.price * item.inventories.quantity;
      }, 0);
    },
  },
});

export const { addItemToCart, removeItemFromCart, changeItemQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
