import { Cart, ProductInCart } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const cart =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cart") || "null")
    : null;

const initialState: Cart = {
  productsInCart: cart?.productsInCart || [],
  total: cart?.total || 0,
  isLoading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // thêm sản phẩm vào giỏ hàng
    addItemToCart: (state, action: PayloadAction<ProductInCart>) => {
      const existingProduct = state.productsInCart.find(
        (product) =>
          product._id === action.payload._id &&
          product.variant.size._id === action.payload.variant.size._id &&
          product.variant.color._id === action.payload.variant.color._id
      );

      if (existingProduct) {
        existingProduct.variant.quantity += action.payload.variant.quantity;
      } else {
        state.productsInCart.push(action.payload);
      }

      // Cập nhật tổng tiền
      const total = state.productsInCart.reduce((sum, item) => {
        return sum + item.price * item.variant.quantity;
      }, 0);

      state.total = total;

      localStorage.setItem(
        "cart",
        JSON.stringify({
          productsInCart: state.productsInCart,
          total: state.total,
        })
      );
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
            product.variant.size._id === action.payload.sizeId &&
            product.variant.color._id === action.payload.colorId
          )
      );

      // Cập nhật tổng tiền
      state.total = state.productsInCart.reduce((sum, item) => {
        return sum + item.price * item.variant.quantity;
      }, 0);

      localStorage.setItem(
        "cart",
        JSON.stringify({
          productsInCart: state.productsInCart,
          total: state.total,
        })
      );
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
          item.variant.size._id === action.payload.sizeId &&
          item.variant.color._id === action.payload.colorId
      );

      if (product) {
        product.variant.quantity = action.payload.quantity;

        if (product.variant.quantity <= 0) {
          // Tự xoá nếu số lượng <= 0
          state.productsInCart = state.productsInCart.filter(
            (item) =>
              !(
                item._id === action.payload._id &&
                item.variant.size._id === action.payload.sizeId &&
                item.variant.color._id === action.payload.colorId
              )
          );
        }
      }

      // Cập nhật tổng tiền
      state.total = state.productsInCart.reduce((sum, item) => {
        return sum + item.price * item.variant.quantity;
      }, 0);

      localStorage.setItem(
        "cart",
        JSON.stringify({
          productsInCart: state.productsInCart,
          total: state.total,
        })
      );
    },
    hideLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  changeItemQuantity,
  hideLoading,
} = cartSlice.actions;
export default cartSlice.reducer;
